import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

// Custom-auth (demo) users carry a session_token instead of a platform session.
const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { session_token } = await req.json();

    if (!session_token || !TOKEN_RE.test(session_token)) {
      return withHeaders({ ok: false, error: "Invalid session" }, 401);
    }

    const users = await base44.asServiceRole.entities.AppUser.filter({ session_token });
    if (!users || users.length !== 1) {
      return withHeaders({ ok: false, error: "Invalid session" }, 401);
    }
    const appUser = users[0];

    const tier = appUser.league_tier || 1;
    const instance = appUser.league_instance || 1;

    // Fetch everyone in this tier, then keep only those in the same server.
    // (league_instance may be unset on legacy users — treat null as server 1.)
    const tierUsers = await base44.asServiceRole.entities.AppUser.filter({ league_tier: tier });
    const board = (tierUsers || [])
      .filter(u => (u.league_instance || 1) === instance)
      .map(u => ({
        rank: 0,
        name: u.display_name || u.username || "Player",
        xp: u.league_xp || 0,
        streak: u.streak_current || 0,
        isUser: u.id === appUser.id,
      }))
      .sort((a, b) => b.xp - a.xp);
    board.forEach((p, i) => (p.rank = i + 1));

    return withHeaders({ ok: true, board, tier, instance, total: board.length });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});