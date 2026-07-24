import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { authorizeAdmin, json } from "../../shared/cronAuth.ts";

Deno.serve(async (req) => {
  try {
    const base44 = await authorizeAdmin(req);

    // Reaches all platform-registered users (the identity layer that has email).
    const users = await base44.asServiceRole.entities.User.list();

    let sent = 0;
    for (const user of users) {
      if (!user.email) continue;
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: user.email,
        from_name: "StockiLearn",
        subject: "🌟 Your daily challenge is ready!",
        body: `Hi ${user.full_name || "there"},

Your daily investing challenge is live on StockiLearn! Open the app to answer today's question, earn XP, and keep your streak alive.

Keep it up!
— The StockiLearn Team`,
      });
      sent++;
    }

    return json({ ok: true, sent, total: users.length });
  } catch (error) {
    const status = error.message === 'Unauthorized' ? 401 : 500;
    return json({ ok: false, error: error.message }, status);
  }
});