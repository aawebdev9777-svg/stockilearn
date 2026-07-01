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

    // Authenticate via platform auth — access is granted based on the
    // authenticated user's role, not a shared password.
    const user = await base44.auth.me();
    if (!user) {
      return withHeaders({ ok: false, error: "Unauthorized" }, 401);
    }

    if (user.role !== "admin") {
      return withHeaders({ ok: false, error: "Forbidden — admin access required" }, 403);
    }

    return withHeaders({ ok: true });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});