import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

// Trusted server-side lesson XP values — the client must never dictate XP.
// The client can only provide lessonId + score; XP is derived here.
const LESSON_XP: Record<string, number> = {
  "1.1": 15, "1.2": 15, "1.3": 15, "1.4": 20, "1.5": 20, "1.6": 15, "1.7": 20, "1.8": 20,
  "2.1": 15, "2.2": 15, "2.3": 20, "2.4": 15, "2.5": 15, "2.6": 15, "2.7": 15, "2.8": 20,
  "1.C": 50,
  "3.1": 15, "3.2": 15, "3.3": 20, "3.4": 20, "3.5": 25,
  "3.C": 50,
  "4.1": 20, "4.2": 20, "4.3": 20, "4.4": 20, "4.5": 25,
  "4.C": 50,
  "5.1": 25, "5.2": 20, "5.3": 25, "5.4": 30, "5.5": 25,
  "5.C": 75,
  "6.1": 20, "6.2": 25, "6.3": 20, "6.4": 25, "6.5": 20, "6.6": 20,
  "6.C": 75,
};

// Calculate XP from trusted lesson data + validated score.
// score is expected as a 0–100 percentage. XP is scaled proportionally
// and clamped to [0, lessonMaxXp]. Returns 0 for unknown lessons.
function calculateXp(lessonId: string, score: number): number {
  const maxXp = LESSON_XP[lessonId];
  if (maxXp === undefined) return 0;
  const clampedScore = Math.max(0, Math.min(100, Number(score) || 0));
  return Math.round((maxXp * clampedScore) / 100);
}

// These are custom-auth (demo) users with no platform session, so
// base44.auth.me() is not applicable — the session_token issued at login/signup
// is the bearer credential. Validate it strictly before any service-role lookup.
// The token is NOT rotated here: lesson completion is a frequent operation and
// rotating on every save would force the client to capture a new credential
// each time, risking lockout if a response is lost.
const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { session_token, lessonId, score } = await req.json();

    if (!session_token || !TOKEN_RE.test(session_token)) {
      return withHeaders({ ok: false, error: "Invalid session" }, 401);
    }

    const users = await base44.asServiceRole.entities.AppUser.filter({ session_token });
    if (!users || users.length !== 1) {
      // 0 → no such token; >1 → token collision (must not happen with random
      // UUIDs). Either way, refuse to act on an ambiguous identity.
      return withHeaders({ ok: false, error: "Invalid session" }, 401);
    }
    const appUser = users[0];

    // Reject locked accounts (reuse the login lockout mechanism).
    if (appUser.locked_until) {
      const lockedUntil = new Date(appUser.locked_until).getTime();
      if (Date.now() < lockedUntil) {
        return withHeaders({ ok: false, error: "Account temporarily locked." }, 403);
      }
    }

    // Only lessonId + score are accepted from the client. xpEarned is NEVER
    // trusted from the request — it is derived server-side.
    if (!lessonId || typeof lessonId !== "string") {
      return withHeaders({ ok: false, error: "Missing or invalid lessonId" }, 400);
    }
    if (LESSON_XP[lessonId] === undefined) {
      return withHeaders({ ok: false, error: "Unknown lesson" }, 400);
    }

    // Prevent XP farming: if the lesson was already completed, award 0 XP.
    const completedLessons = appUser.completed_lessons || [];
    const alreadyCompleted = completedLessons.includes(lessonId);
    const xpEarned = alreadyCompleted ? 0 : calculateXp(lessonId, score);

    if (!alreadyCompleted) {
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

    const { password_hash, session_token: _st, ...safeUser } = updated;
    return withHeaders({ ok: true, user: safeUser, xpEarned });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});