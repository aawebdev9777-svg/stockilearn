import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

// Validates a custom-auth (demo) session token. Used on app load to detect
// stale/localStorage sessions left from a previous user on the same browser,
// so visitors who aren't actually logged in are sent to the landing page
// instead of seeing someone else's account.
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { session_token } = await req.json();

    if (!session_token) {
      return withHeaders({ ok: false }, 400);
    }

    const users = await base44.asServiceRole.entities.AppUser.filter({ session_token });
    if (!users || users.length === 0) {
      return withHeaders({ ok: false });
    }

    const { password_hash, ...safeUser } = users[0];
    return withHeaders({ ok: true, user: safeUser });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});