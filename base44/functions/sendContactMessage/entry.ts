import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function json(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

// Database-backed rate limiting (persists across serverless isolates):
// max 5 submissions per IP per hour, counted via the ContactSubmission entity.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function clientIp(req) {
  // Use the rightmost X-Forwarded-For entry — this is the one appended by the
  // trusted edge proxy. Leftmost entries are client-supplied and spoofable.
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) {
    const parts = fwd.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return req.headers.get('x-real-ip') || 'unknown';
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const ip = clientIp(req);

    let body;
    try {
      body = await req.json();
    } catch {
      return json({ ok: false, error: 'Invalid request body.' }, 400);
    }

    const name = (body?.name || '').toString().trim().slice(0, 100);
    const email = (body?.email || '').toString().trim().slice(0, 200);
    const message = (body?.message || '').toString().trim().slice(0, 5000);

    if (!name || !email || !message) {
      return json({ ok: false, error: 'All fields are required.' }, 400);
    }
    if (!EMAIL_RE.test(email)) {
      return json({ ok: false, error: 'Please provide a valid email address.' }, 400);
    }

    // Persistent, cross-isolate rate limiting: count this IP's submissions in
    // the rolling window before accepting a new one.
    const windowStart = new Date(Date.now() - WINDOW_MS).toISOString();
    const recent = await base44.asServiceRole.entities.ContactSubmission.filter({
      ip,
      created_date: { $gte: windowStart },
    });
    if (recent && recent.length >= MAX_PER_WINDOW) {
      return json({ ok: false, error: 'Too many requests. Please try again later.' }, 429);
    }

    // Log the submission (acts as the durable rate-limit counter) and prune
    // stale entries for this IP to keep the table bounded.
    await base44.asServiceRole.entities.ContactSubmission.create({ ip, email });
    await base44.asServiceRole.entities.ContactSubmission.deleteMany({
      ip,
      created_date: { $lt: windowStart },
    });

    // Deliver the message to the connected Outlook inbox via Microsoft Graph.
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('outlook');
    const graphHeaders = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    // Resolve the connected account's own email address (the recipient).
    const meRes = await fetch('https://graph.microsoft.com/v1.0/me?$select=mail,userPrincipalName', {
      headers: graphHeaders,
    });
    if (!meRes.ok) {
      return json({ ok: false, error: 'Unable to resolve Outlook account.' }, 502);
    }
    const me = await meRes.json();
    const recipient = me.mail || me.userPrincipalName;

    const sendRes = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
      method: 'POST',
      headers: graphHeaders,
      body: JSON.stringify({
        message: {
          subject: `New message from ${name}`,
          body: {
            contentType: 'Text',
            content: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          },
          toRecipients: [{ emailAddress: { address: recipient } }],
          replyTo: [{ emailAddress: { address: email } }],
        },
        saveToSentItems: true,
      }),
    });
    if (!sendRes.ok) {
      const detail = await sendRes.text();
      return json({ ok: false, error: `Outlook delivery failed: ${sendRes.status} ${detail}` }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: error.message }, 500);
  }
});