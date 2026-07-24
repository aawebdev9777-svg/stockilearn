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

    const recipient = Deno.env.get('CONTACT_RECIPIENT_EMAIL');
    if (!recipient) {
      return json({ ok: false, error: 'Contact form is not configured.' }, 500);
    }

    // Log the submission (acts as the durable rate-limit counter) and prune
    // stale entries for this IP to keep the table bounded.
    await base44.asServiceRole.entities.ContactSubmission.create({ ip, email });
    await base44.asServiceRole.entities.ContactSubmission.deleteMany({
      ip,
      created_date: { $lt: windowStart },
    });

    await base44.integrations.Core.SendEmail({
      to: recipient,
      from_name: 'StockiLearn Contact Form',
      subject: `New message from ${name}`,
      body: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: error.message }, 500);
  }
});