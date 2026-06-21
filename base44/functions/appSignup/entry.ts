import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const existing = await base44.asServiceRole.entities.AppUser.filter({ username: username.toLowerCase() });
    if (existing && existing.length > 0) {
      return Response.json({ ok: false, error: "Username already taken. Try another." });
    }

    const allUsers = await base44.asServiceRole.entities.AppUser.list();
    const isFirst = !allUsers || allUsers.length === 0;

    const newUser = await base44.asServiceRole.entities.AppUser.create({
      username: username.toLowerCase(),
      display_name: username,
      password_hash: password,
      role: isFirst ? "admin" : "user",
      xp_total: 0, level: 1, streak_current: 0, streak_longest: 0,
      hearts_current: 5, gems: 0, daily_xp_earned_today: 0,
      daily_goal_xp: 50, league_tier: 1, league_xp: 0,
      onboarding_complete: false, preferred_currency: "GBP",
    });

    return Response.json({ ok: true, user: newUser });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
});