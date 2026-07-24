import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

export function json(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

/**
 * Guards scheduled/privileged backend handlers so only an authenticated
 * administrator (the workspace owner the scheduler runs as) can execute them.
 * Returns a base44 client scoped to the authorized caller, or throws
 * "Unauthorized" — callers should map that to a 401 response.
 */
export async function authorizeAdmin(req) {
  const base44 = createClientFromRequest(req);
  let user;
  try {
    user = await base44.auth.me();
  } catch {
    throw new Error('Unauthorized');
  }
  if (!user || user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  return base44;
}