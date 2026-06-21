import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json({ ok: false, error: "Missing credentials" }, { status: 400 });
    }

    const users = await base44.asServiceRole.entities.AppUser.filter({ username: username.toLowerCase() });
    if (!users || users.length === 0) {
      return Response.json({ ok: false, error: "User not found" });
    }
    const found = users[0];
    if (found.password_hash !== password) {
      return Response.json({ ok: false, error: "Wrong password" });
    }

    return Response.json({ ok: true, user: found });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
});