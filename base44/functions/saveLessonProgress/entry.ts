import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

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
    const { sessionToken, lessonId, score, xpEarned } = await req.json();

    if (!sessionToken || !lessonId) {
      return withHeaders({ ok: false, error: "Missing required fields" }, 400);
    }

    // Verify the session token to authorize the request — the user ID is
    // derived from the token, never trusted from the client payload.
    const users = await base44.asServiceRole.entities.AppUser.filter({ session_token: sessionToken });
    if (!users || users.length === 0) {
      return withHeaders({ ok: false, error: "Unauthorized" }, 401);
    }
    const user = users[0];

    const completedLessons = user.completed_lessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    const today = new Date().toISOString().split("T")[0];
    const isNewDay = user.last_active_date !== today;
    const newDailyXp = isNewDay ? xpEarned : (user.daily_xp_earned_today || 0) + xpEarned;
    const newStreak = isNewDay ? (user.streak_current || 0) + 1 : (user.streak_current || 0);

    const updated = await base44.asServiceRole.entities.AppUser.update(user.id, {
      completed_lessons: completedLessons,
      xp_total: (user.xp_total || 0) + xpEarned,
      daily_xp_earned_today: newDailyXp,
      streak_current: newStreak,
      streak_longest: Math.max(newStreak, user.streak_longest || 0),
      last_active_date: today,
      league_xp: (user.league_xp || 0) + xpEarned,
    });

    const { password_hash, ...safeUser } = updated;
    return withHeaders({ ok: true, user: safeUser });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});