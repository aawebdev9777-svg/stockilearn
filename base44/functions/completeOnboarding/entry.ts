import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

// Persists onboarding completion for custom-auth (demo) users, who have no
// platform auth session — so the client SDK can't pass AppUser RLS. Uses the
// service role, authenticated by the session_token issued at login/signup.
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { session_token, goal_type, knowledge_level, daily_goal_xp } = await req.json();

    // These are custom-auth (demo) users with no platform session, so
    // base44.auth.me() is not applicable here — the session_token issued at
    // login/signup is the bearer credential. Validate it strictly before any
    // service-role lookup.
    const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!session_token || !TOKEN_RE.test(session_token)) {
      return withHeaders({ ok: false, error: "Invalid session" }, 401);
    }

    const users = await base44.asServiceRole.entities.AppUser.filter({ session_token });
    if (!users || users.length === 0) {
      return withHeaders({ ok: false, error: "Invalid session" }, 401);
    }
    const user = users[0];

    // Reject locked accounts (reuse the login lockout mechanism).
    if (user.locked_until) {
      const lockedUntil = new Date(user.locked_until).getTime();
      if (Date.now() < lockedUntil) {
        return withHeaders({ ok: false, error: "Account temporarily locked." }, 403);
      }
    }

    // Already completed — don't repeat. Return current state so the client
    // can route the user straight home.
    if (user.onboarding_complete) {
      const { password_hash, ...safeUser } = user;
      return withHeaders({ ok: true, user: safeUser, alreadyCompleted: true });
    }

    const updated = await base44.asServiceRole.entities.AppUser.update(user.id, {
      goal_type,
      knowledge_level,
      daily_goal_xp,
      onboarding_complete: true,
    });

    const { password_hash, ...safeUser } = updated;
    return withHeaders({ ok: true, user: safeUser });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});