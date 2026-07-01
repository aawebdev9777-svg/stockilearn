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

    // Identify the authenticated user via platform auth — identity comes
    // from the request's auth context, never from a client-provided token.
    const user = await base44.auth.me();
    if (!user) {
      return withHeaders({ ok: false, error: "Unauthorized" }, 401);
    }

    const { lessonId, score, xpEarned } = await req.json();

    if (!lessonId) {
      return withHeaders({ ok: false, error: "Missing required fields" }, 400);
    }

    // Find the AppUser record owned by this authenticated user.
    const users = await base44.asServiceRole.entities.AppUser.filter({ created_by_id: user.id });
    if (!users || users.length === 0) {
      return withHeaders({ ok: false, error: "User profile not found" }, 404);
    }
    const appUser = users[0];

    const completedLessons = appUser.completed_lessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    const today = new Date().toISOString().split("T")[0];
    const isNewDay = appUser.last_active_date !== today;
    const newDailyXp = isNewDay ? xpEarned : (appUser.daily_xp_earned_today || 0) + xpEarned;
    const newStreak = isNewDay ? (appUser.streak_current || 0) + 1 : (appUser.streak_current || 0);

    const updated = await base44.asServiceRole.entities.AppUser.update(appUser.id, {
      completed_lessons: completedLessons,
      xp_total: (appUser.xp_total || 0) + xpEarned,
      daily_xp_earned_today: newDailyXp,
      streak_current: newStreak,
      streak_longest: Math.max(newStreak, appUser.streak_longest || 0),
      last_active_date: today,
      league_xp: (appUser.league_xp || 0) + xpEarned,
    });

    const { password_hash, ...safeUser } = updated;
    return withHeaders({ ok: true, user: safeUser });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});