import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

// Database-backed rate limiting (persists across serverless isolates)
const MAX_ATTEMPTS = 5;
const BLOCK_MS = 15 * 60 * 1000;

async function verifyPassword(password, stored) {
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const iterations = parseInt(parts[1], 10);
  const salt = new Uint8Array(parts[2].match(/.{2}/g).map(h => parseInt(h, 16)));
  const expectedHash = parts[3];
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial, 256
  );
  const hashHex = [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === expectedHash;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { username, password } = await req.json();

    if (!username || !password) {
      return withHeaders({ ok: false, error: "Missing credentials" }, 400);
    }

    const users = await base44.asServiceRole.entities.AppUser.filter({ username: username.toLowerCase() });
    if (!users || users.length === 0) {
      return withHeaders({ ok: false, error: "User not found" });
    }
    const found = users[0];

    // Check persistent account lockout
    if (found.locked_until) {
      const lockedUntil = new Date(found.locked_until).getTime();
      if (Date.now() < lockedUntil) {
        return withHeaders({ ok: false, error: "Too many attempts. Try again later." }, 429);
      }
    }

    const valid = await verifyPassword(password, found.password_hash || '');
    if (!valid) {
      const attempts = (found.failed_login_attempts || 0) + 1;
      if (attempts >= MAX_ATTEMPTS) {
        await base44.asServiceRole.entities.AppUser.update(found.id, {
          failed_login_attempts: attempts,
          locked_until: new Date(Date.now() + BLOCK_MS).toISOString(),
        });
      } else {
        await base44.asServiceRole.entities.AppUser.update(found.id, {
          failed_login_attempts: attempts,
        });
      }
      return withHeaders({ ok: false, error: "Wrong password" });
    }

    // Clear failures on success
    if (found.failed_login_attempts || found.locked_until) {
      await base44.asServiceRole.entities.AppUser.update(found.id, {
        failed_login_attempts: 0,
        locked_until: null,
      });
    }
    const sessionToken = crypto.randomUUID();
    await base44.asServiceRole.entities.AppUser.update(found.id, { session_token: sessionToken });
    const { password_hash, ...safeUser } = found;
    return withHeaders({ ok: true, user: { ...safeUser, session_token: sessionToken } });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});