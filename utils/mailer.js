const nodemailer = require('nodemailer');

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

async function sendWelcomeEmail(user) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email not configured (EMAIL_USER / EMAIL_PASS missing). Skipping welcome email.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const store = process.env.STORE_NAME || 'Karim Premium Watches';
  const name = escapeHtml(user.name);

  await transporter.sendMail({
    from: `"${store}" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `Welcome to ${store}, ${user.name}!`,
    text: `Hello ${user.name},\n\nThank you for registering at ${store}. Your account has been created successfully with ${user.email}.\n\nExplore our premium watch collection anytime.\n\n- ${store} Team`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
        <h2 style="color:#b8860b;margin-top:0">Welcome to ${escapeHtml(store)}!</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for registering. Your account has been created successfully with <strong>${escapeHtml(user.email)}</strong>.</p>
        <p>Explore our premium watch collection anytime.</p>
        <p style="color:#888;font-size:13px">&mdash; ${escapeHtml(store)} Team</p>
      </div>`,
  });

  console.log(`Welcome email sent to ${user.email}`);
}

module.exports = { sendWelcomeEmail };
