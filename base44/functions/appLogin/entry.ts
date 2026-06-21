import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

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

    const valid = await verifyPassword(password, found.password_hash || '');
    if (!valid) {
      return withHeaders({ ok: false, error: "Wrong password" });
    }

    const { password_hash, ...safeUser } = found;
    return withHeaders({ ok: true, user: safeUser });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});