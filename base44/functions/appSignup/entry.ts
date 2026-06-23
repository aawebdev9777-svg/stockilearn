import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iterations = 100000;
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial, 256
  );
  const saltHex = [...salt].map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
  return `pbkdf2$${iterations}$${saltHex}$${hashHex}`;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { username, password } = await req.json();

    if (!username || !password) {
      return withHeaders({ ok: false, error: "Missing fields" }, 400);
    }
    if (username.length < 3) {
      return withHeaders({ ok: false, error: "Username must be at least 3 characters" }, 400);
    }
    if (password.length < 8) {
      return withHeaders({ ok: false, error: "Password must be at least 8 characters" }, 400);
    }

    const existing = await base44.asServiceRole.entities.AppUser.filter({ username: username.toLowerCase() });
    if (existing && existing.length > 0) {
      return withHeaders({ ok: false, error: "Username already taken. Try another." });
    }

    const allUsers = await base44.asServiceRole.entities.AppUser.list();
    const isFirst = !allUsers || allUsers.length === 0;

    const passwordHash = await hashPassword(password);

    const sessionToken = crypto.randomUUID();
    const newUser = await base44.asServiceRole.entities.AppUser.create({
      username: username.toLowerCase(),
      display_name: username,
      password_hash: passwordHash,
      session_token: sessionToken,
      role: isFirst ? "admin" : "user",
      xp_total: 0, level: 1, streak_current: 0, streak_longest: 0,
      hearts_current: 5, gems: 0, daily_xp_earned_today: 0,
      daily_goal_xp: 50, league_tier: 1, league_xp: 0,
      onboarding_complete: false, preferred_currency: "GBP",
    });

    const { password_hash, ...safeUser } = newUser;
    return withHeaders({ ok: true, user: safeUser });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});