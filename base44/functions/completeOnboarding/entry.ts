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

    if (!session_token) {
      return withHeaders({ ok: false, error: "Missing session" }, 400);
    }

    const users = await base44.asServiceRole.entities.AppUser.filter({ session_token });
    if (!users || users.length === 0) {
      return withHeaders({ ok: false, error: "Invalid session" }, 401);
    }
    const user = users[0];

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