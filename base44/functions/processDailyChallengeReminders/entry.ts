import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getTodaysChallenge } from "../../shared/dailyChallenge.ts";

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const users = await base44.asServiceRole.entities.User.list();
    const today = new Date().toISOString().split("T")[0];
    const challenge = getTodaysChallenge();

    let completedCount = 0;
    let remindedCount = 0;

    for (const user of users) {
      // Was today's challenge completed by this user?
      const records = await base44.asServiceRole.entities.DailyChallenge.filter({
        created_by_id: user.id,
        challenge_date: today,
      });
      const done = records.find(r => r.completed);

      if (done) {
        completedCount++;
        // Update TopicMastery for today's topic (only records the user owns —
        // service-role create cannot set created_by_id, so we update existing ones).
        const mastery = await base44.asServiceRole.entities.TopicMastery.filter({
          created_by_id: user.id,
          topic: challenge.topic,
        });
        if (mastery.length > 0) {
          const m = mastery[0];
          const prevLessons = m.lessons_completed || 0;
          const prevAcc = m.quiz_accuracy || 0;
          const newLessons = prevLessons + 1;
          // Running average accuracy weighted by completed lessons.
          const newAcc = Math.round((prevAcc * prevLessons + (done.score || 0)) / newLessons);
          await base44.asServiceRole.entities.TopicMastery.update(m.id, {
            lessons_completed: newLessons,
            total_xp_earned: (m.total_xp_earned || 0) + (done.xp_earned ?? challenge.xp),
            quiz_accuracy: Math.min(100, newAcc),
            last_practiced: today,
          });
        }
      } else if (user.email) {
        // Gentle reminder for users who haven't completed within 12 hours.
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: user.email,
          from_name: "StockiLearn",
          subject: "⏰ Don't forget your daily challenge!",
          body: `Hi ${user.full_name || "there"},

Your daily challenge is still waiting! You still have time to answer today's question, earn XP, and protect your streak.

Open StockiLearn to play now.

— The StockiLearn Team`,
        });
        remindedCount++;
      }
    }

    return withHeaders({ ok: true, completed: completedCount, reminded: remindedCount, total: users.length });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});