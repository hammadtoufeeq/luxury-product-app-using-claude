import { Resend } from 'resend'

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmail(payload) {
  const { type, name, email, message, product, items, total } = payload

  if (type === 'product-question') {
    return {
      subject: `Question about ${product} — from ${name}`,
      html: `
        <h2>New product question</h2>
        <p><strong>Product:</strong> ${escapeHtml(product)}</p>
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    }
  }

  if (type === 'purchase-request') {
    const itemsHtml = (items || [])
      .map(
        (item) =>
          `<li>${item.quantity} × ${escapeHtml(item.name)} — $${(
            item.price * item.quantity
          ).toLocaleString()}</li>`,
      )
      .join('')
    return {
      subject: `Purchase request from ${name} — $${Number(total || 0).toLocaleString()}`,
      html: `
        <h2>New purchase request</h2>
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <ul>${itemsHtml}</ul>
        <p><strong>Total:</strong> $${Number(total || 0).toLocaleString()}</p>
      `,
    }
  }

  return {
    subject: `New contact message from ${name}`,
    html: `
      <h2>New contact message</h2>
      <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message || '').replace(/\n/g, '<br>')}</p>
    `,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email } = req.body || {}
  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL

  if (!apiKey || !to) {
    console.error('Email is not configured: missing RESEND_API_KEY or CONTACT_EMAIL')
    res.status(500).json({ error: 'Email is not configured on the server' })
    return
  }

  const { subject, html } = buildEmail(req.body)
  const resend = new Resend(apiKey)

  try {
    const result = await resend.emails.send({
      from: 'Maison Lumière <onboarding@resend.dev>',
      to,
      replyTo: email,
      subject,
      html,
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      res.status(502).json({ error: 'Failed to send email' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to send email:', err)
    res.status(500).json({ error: 'Failed to send email' })
  }
}
