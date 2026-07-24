import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

// Shared admin password gate (same value used client-side in the Admin panel).
const ADMIN_PASSWORD = "AA9777";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { password } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return withHeaders({ ok: false, error: "Forbidden" }, 403);
    }

    // Service role bypasses RLS so the full roster is visible to anyone
    // holding the admin password — used by the Servers tab in the Admin panel.
    const all = await base44.asServiceRole.entities.AppUser.list();

    const groups = {};
    for (const u of (all || [])) {
      const inst = u.league_instance || 1;
      if (!groups[inst]) groups[inst] = [];
      groups[inst].push({
        name: u.display_name || u.username || "Player",
        username: u.username,
        xp: u.league_xp || 0,
        streak: u.streak_current || 0,
        tier: u.league_tier || 1,
      });
    }

    const servers = Object.keys(groups)
      .map(k => {
        const players = groups[Number(k)].sort((a, b) => b.xp - a.xp);
        return { instance: Number(k), count: players.length, players };
      })
      .sort((a, b) => a.instance - b.instance);

    return withHeaders({ ok: true, servers });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});