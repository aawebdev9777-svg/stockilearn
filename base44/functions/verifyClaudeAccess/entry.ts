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
    const { password } = await req.json();

    if (!password) {
      return withHeaders({ ok: false, error: "Missing password" }, 400);
    }

    const storedPassword = Deno.env.get("CLAUDE_ACCESS_PASSWORD");
    if (!storedPassword) {
      return withHeaders({ ok: false, error: "Access not configured" }, 500);
    }

    // Constant-time comparison to prevent timing attacks
    const a = new TextEncoder().encode(password);
    const b = new TextEncoder().encode(storedPassword);
    if (a.length !== b.length) {
      return withHeaders({ ok: false, error: "Incorrect password" }, 401);
    }
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
    if (diff !== 0) {
      return withHeaders({ ok: false, error: "Incorrect password" }, 401);
    }

    return withHeaders({ ok: true });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});