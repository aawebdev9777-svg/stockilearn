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

const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const VALID_STATUSES = ["pending", "reviewing", "accepted", "rejected", "implemented"];
const VALID_TYPES = ["ambassador_application", "change_report"];
const VALID_CATEGORIES = ["bug", "feature", "content", "gamification", "design", "other"];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { action } = body;

    // ── Admin actions (gated by admin password) ──────────────────
    if (action === "list_all") {
      if (body.password !== ADMIN_PASSWORD) {
        return withHeaders({ ok: false, error: "Forbidden" }, 403);
      }
      const all = await base44.asServiceRole.entities.AmbassadorReport.list('-created_date', 500);
      return withHeaders({ ok: true, reports: all || [] });
    }

    if (action === "set_status") {
      if (body.password !== ADMIN_PASSWORD) {
        return withHeaders({ ok: false, error: "Forbidden" }, 403);
      }
      const { report_id, status, admin_note } = body;
      if (!report_id || !VALID_STATUSES.includes(status)) {
        return withHeaders({ ok: false, error: "Invalid input" }, 400);
      }
      const update = { status };
      if (typeof admin_note === "string") update.admin_note = admin_note;
      await base44.asServiceRole.entities.AmbassadorReport.update(report_id, update);
      return withHeaders({ ok: true });
    }

    // ── User actions (gated by session_token) ─────────────────────
    if (action === "check") {
      const { session_token } = body;
      if (!session_token || !TOKEN_RE.test(session_token)) {
        return withHeaders({ ok: false, error: "Invalid session" }, 401);
      }
      const users = await base44.asServiceRole.entities.AppUser.filter({ session_token });
      if (!users || users.length !== 1) {
        return withHeaders({ ok: false, error: "Invalid session" }, 401);
      }
      const appUser = users[0];
      const mine = await base44.asServiceRole.entities.AmbassadorReport.filter({ app_user_id: appUser.id }, '-created_date', 200);
      const approved = (mine || []).some(r => r.type === "ambassador_application" && r.status === "accepted");
      return withHeaders({ ok: true, approved, reports: mine || [], user: { username: appUser.username, display_name: appUser.display_name } });
    }

    if (action === "submit") {
      const { session_token, type, title, description, category } = body;
      if (!session_token || !TOKEN_RE.test(session_token)) {
        return withHeaders({ ok: false, error: "Invalid session" }, 401);
      }
      const users = await base44.asServiceRole.entities.AppUser.filter({ session_token });
      if (!users || users.length !== 1) {
        return withHeaders({ ok: false, error: "Invalid session" }, 401);
      }
      const appUser = users[0];
      if (!VALID_TYPES.includes(type)) {
        return withHeaders({ ok: false, error: "Invalid type" }, 400);
      }
      if (!title || !description || !title.trim() || !description.trim()) {
        return withHeaders({ ok: false, error: "Missing fields" }, 400);
      }
      const cat = VALID_CATEGORIES.includes(category) ? category : "other";
      // Only allow change_report if already an approved ambassador; applications
      // are always allowed (anyone can apply). The portal gates change reports
      // client-side, but enforce server-side too.
      if (type === "change_report") {
        const existing = await base44.asServiceRole.entities.AmbassadorReport.filter({ app_user_id: appUser.id }, '-created_date', 200);
        const isApproved = (existing || []).some(r => r.type === "ambassador_application" && r.status === "accepted");
        if (!isApproved) {
          return withHeaders({ ok: false, error: "Only approved ambassadors can submit change reports" }, 403);
        }
      }
      const created = await base44.asServiceRole.entities.AmbassadorReport.create({
        type,
        title: title.trim(),
        description: description.trim(),
        category: cat,
        status: "pending",
        app_user_id: appUser.id,
        username: appUser.username,
      });
      return withHeaders({ ok: true, report: created });
    }

    return withHeaders({ ok: false, error: "Unknown action" }, 400);
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});