// /functions/api/submit.js

const FIRM_EMAIL = "info@startupindia.law";
const SEND_FROM = "StartupIndia.Law <mail@mail.startupindia.law>";
const PRIMARY_ORIGIN = "https://startupindia.law";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAllowedOrigin(origin) {
  if (!origin) return true; // Same-origin or non-browser request
  if (
    origin === "https://startupindia.law" ||
    origin === "https://www.startupindia.law"
  ) {
    return true;
  }
  // Allow localhost and local dev IPs for testing
  if (
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:")
  ) {
    return true;
  }
  return false;
}

export async function onRequestOptions(context) {
  const { request } = context;
  const origin = request.headers.get("Origin");

  if (!isAllowedOrigin(origin)) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin || PRIMARY_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // --- CORS: validate request origin ---
  const origin = request.headers.get("Origin");
  if (!isAllowedOrigin(origin)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const corsHeaders = {
    "Content-Type": "application/json",
    ...(origin ? { "Access-Control-Allow-Origin": origin } : {}),
  };

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const {
    name = "",
    email = "",
    company = "",
    phone = "",
    practiceArea = "",
    message = "",
    website = "", // honeypot field — real users never fill this
  } = body;

  // --- Honeypot spam check: real users never fill this hidden field ---
  if (website && website.trim() !== "") {
    // Silently succeed so bots don't learn the check exists
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  }

  // --- Required field validation ---
  if (!name.trim() || !email.trim() || !message.trim()) {
    return new Response(
      JSON.stringify({ error: "Name, email, and message are required." }),
      { status: 400, headers: corsHeaders }
    );
  }

  if (!isValidEmail(email)) {
    return new Response(JSON.stringify({ error: "Invalid email address." }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  // --- Sanitize before inserting into HTML email templates ---
  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeCompany = escapeHtml(company.trim());
  const safePhone = escapeHtml(phone.trim());
  const safePractice = escapeHtml(practiceArea.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

  // --- Executive HTML email templates ---
  const notifyHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:24px 12px;background-color:#F4F4F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #E5E7EB;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.04);">
    <div style="background-color:#111827;padding:20px 28px;border-bottom:2px solid #1E3A8A;">
      <span style="font-family:Georgia,serif;font-size:18px;font-weight:600;color:#FFFFFF;letter-spacing:-0.01em;">StartupIndia<span style="color:#93C5FD;">.Law</span></span>
      <span style="float:right;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9CA3AF;line-height:22px;">NEW CLIENT INQUIRY</span>
    </div>

    <div style="padding:28px;">
      <h2 style="font-family:Georgia,serif;font-size:22px;font-weight:400;color:#111827;margin:0 0 16px;letter-spacing:-0.02em;">
        New Inquiry from ${safeName}
      </h2>

      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;font-size:14px;">
        <tr style="border-bottom:1px solid #F3F4F6;">
          <td style="padding:10px 0;color:#6B7280;width:130px;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:0.05em;">Client Name</td>
          <td style="padding:10px 0;color:#111827;font-weight:600;">${safeName}</td>
        </tr>
        <tr style="border-bottom:1px solid #F3F4F6;">
          <td style="padding:10px 0;color:#6B7280;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:0.05em;">Work Email</td>
          <td style="padding:10px 0;"><a href="mailto:${safeEmail}" style="color:#1E3A8A;text-decoration:none;font-weight:500;">${safeEmail}</a></td>
        </tr>
        ${safeCompany ? `
        <tr style="border-bottom:1px solid #F3F4F6;">
          <td style="padding:10px 0;color:#6B7280;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:0.05em;">Venture / Firm</td>
          <td style="padding:10px 0;color:#111827;">${safeCompany}</td>
        </tr>` : ""}
        ${safePhone ? `
        <tr style="border-bottom:1px solid #F3F4F6;">
          <td style="padding:10px 0;color:#6B7280;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:0.05em;">Phone / WhatsApp</td>
          <td style="padding:10px 0;"><a href="https://wa.me/${safePhone.replace(/[^0-9]/g, "")}" style="color:#1E3A8A;text-decoration:none;">${safePhone}</a></td>
        </tr>` : ""}
        ${safePractice ? `
        <tr style="border-bottom:1px solid #F3F4F6;">
          <td style="padding:10px 0;color:#6B7280;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:0.05em;">Specialty Area</td>
          <td style="padding:10px 0;color:#111827;font-weight:500;">${safePractice}</td>
        </tr>` : ""}
      </table>

      <div style="margin:0 0 24px;">
        <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B7280;margin-bottom:8px;">Inquiry Narrative</span>
        <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-left:3px solid #111827;border-radius:6px;padding:16px 18px;font-size:14.5px;line-height:1.6;color:#1F2937;">
          ${safeMessage}
        </div>
      </div>

      <div style="border-top:1px solid #E5E7EB;padding-top:18px;display:flex;gap:12px;">
        <a href="mailto:${safeEmail}?subject=Re:%20StartupIndia.Law%20Inquiry%20%E2%80%94%20${encodeURIComponent(name.trim())}" style="display:inline-block;background-color:#111827;color:#FFFFFF;text-decoration:none;font-size:13px;font-weight:500;padding:10px 18px;border-radius:6px;">
          Reply to ${safeName} &rarr;
        </a>
        ${safePhone ? `
        <a href="https://wa.me/${safePhone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(name.trim())},%20following%20up%20on%20your%20inquiry%20to%20StartupIndia.Law." style="display:inline-block;background-color:#F3F4F6;color:#111827;border:1px solid #D1D5DB;text-decoration:none;font-size:13px;font-weight:500;padding:10px 18px;border-radius:6px;">
          WhatsApp Chat
        </a>` : ""}
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const confirmHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:24px 12px;background-color:#FBFAF8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <div style="max-width:580px;margin:0 auto;background:#FFFFFF;border:1px solid #EAE8E2;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(17,24,39,0.04);">
    <!-- Letterhead -->
    <div style="padding:24px 32px 20px;border-bottom:1px solid #F0EFEA;background:#FAF9F6;">
      <span style="font-family:Georgia,serif;font-size:20px;font-weight:600;color:#111827;letter-spacing:-0.02em;">StartupIndia<span style="color:#1E3A8A;">.Law</span></span>
      <span style="float:right;font-size:11px;font-weight:600;color:#6B7280;letter-spacing:0.08em;text-transform:uppercase;line-height:24px;">CONFIDENTIAL</span>
    </div>

    <div style="padding:32px;">
      <p style="font-size:16px;font-weight:600;color:#111827;margin:0 0 16px;">Dear ${safeName},</p>

      <p style="font-size:15px;line-height:1.65;color:#374151;margin:0 0 16px;">
        Thank you for reaching out to StartupIndia.Law.
      </p>

      <p style="font-size:15px;line-height:1.65;color:#374151;margin:0 0 22px;">
        This confirms that our team has received your message. We are currently reviewing your details and our team will get back to you with an initial assessment, usually within one business day.
      </p>

      <!-- Inquiry Snapshot Box -->
      <div style="background-color:#FAF9F6;border:1px solid #EAE8E2;border-left:3px solid #1E3A8A;border-radius:6px;padding:16px 18px;margin:0 0 22px;">
        <span style="display:block;font-size:11px;font-weight:700;color:#6B7280;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 6px;">Summary of Your Submission</span>
        ${safePractice ? `<p style="font-size:13.5px;color:#1F2937;margin:0 0 4px;"><strong>Specialty Area:</strong> ${safePractice}</p>` : ""}
        ${safeCompany ? `<p style="font-size:13.5px;color:#1F2937;margin:0 0 4px;"><strong>Venture:</strong> ${safeCompany}</p>` : ""}
        <p style="font-size:13.5px;color:#4B5563;line-height:1.55;margin:4px 0 0;font-style:italic;">"${safeMessage}"</p>
      </div>

      <p style="font-size:13.5px;line-height:1.6;color:#6B7280;margin:0 0 24px;">
        All communications and preliminary disclosures sent to StartupIndia.Law are received under strict professional confidence pursuant to the Advocates Act, 1961.
      </p>

      <!-- Urgent Contact Section -->
      <div style="border-top:1px solid #F0EFEA;padding-top:20px;margin-bottom:26px;">
        <p style="font-size:13.5px;color:#374151;line-height:1.5;margin:0 0 12px;">
          <strong>Need an immediate response?</strong><br>
          You can reply directly to this email, or message our team on WhatsApp:
        </p>
        <a href="https://wa.me/917827963285" style="display:inline-block;background-color:#111827;color:#FFFFFF;text-decoration:none;font-size:13px;font-weight:500;padding:9px 18px;border-radius:6px;letter-spacing:0.02em;">
          Message on WhatsApp (+91 78279 63285) &rarr;
        </a>
      </div>

      <!-- Sign-off -->
      <div style="border-top:1px solid #F0EFEA;padding-top:20px;">
        <p style="font-size:14.5px;color:#111827;margin:0 0 4px;font-weight:600;">Warm regards,</p>
        <p style="font-size:14px;color:#1F2937;margin:0 0 4px;font-weight:600;">The Team at StartupIndia.Law</p>
        <p style="font-size:12.5px;color:#6B7280;margin:0;line-height:1.5;">
          Techno-Legal &amp; IP Advisory for High-Growth Ventures<br>
          Offices in Mumbai &amp; Delhi-NCR &bull; <a href="https://startupindia.law" style="color:#1E3A8A;text-decoration:none;">startupindia.law</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  try {
    if (!env || !env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable in Cloudflare Worker settings");
      return new Response(
        JSON.stringify({ error: "Server configuration: RESEND_API_KEY is missing in Cloudflare Worker environment variables." }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Email 1: notify the firm, reply-to the submitter
    const notifyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: SEND_FROM,
        to: [FIRM_EMAIL],
        reply_to: email.trim(),
        subject: `New Legal Inquiry: ${name.trim()}${company.trim() ? ` — ${company.trim()}` : ""}`,
        html: notifyHtml,
      }),
    });

    // Email 2: confirm to the submitter, reply-to the firm
    const confirmRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: SEND_FROM,
        to: [email.trim()],
        reply_to: FIRM_EMAIL,
        subject: "We've received your inquiry — StartupIndia.Law",
        html: confirmHtml,
      }),
    });

    if (!notifyRes.ok || !confirmRes.ok) {
      const notifyErr = !notifyRes.ok ? await notifyRes.text() : "";
      const confirmErr = !confirmRes.ok ? await confirmRes.text() : "";
      console.error("Resend API error:", { notifyErr, confirmErr });
      return new Response(
        JSON.stringify({ error: `Resend API error: ${notifyErr || confirmErr}` }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Submission handler error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send. Please try again or message us on WhatsApp." }),
      { status: 500, headers: corsHeaders }
    );
  }
}
