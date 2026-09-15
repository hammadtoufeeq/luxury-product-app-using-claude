import { useState } from 'react'
import { sendEmail } from '../lib/sendEmail'

function InquiryForm({ productName }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await sendEmail({ type: 'product-question', product: productName, name, email, message })
      setStatus('sent')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p className="thank-you">
        Thank you, {name}! We&rsquo;ve received your question about {productName} and will be in
        touch soon.
      </p>
    )
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <h3 className="inquiry-title">Have a Question About This Piece?</h3>
      <p className="inquiry-subtitle">
        Availability, sizing, condition — let us know and we&rsquo;ll get back to you.
      </p>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        placeholder="Your question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        required
      />
      {status === 'error' && <p className="form-error">{error}</p>}
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

export default InquiryForm
