import { useState } from 'react'

function InquiryForm({ productName }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Product question:', { product: productName, name, email, message })
    setSubmitted(true)
  }

  if (submitted) {
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
      <button type="submit">Send Message</button>
    </form>
  )
}

export default InquiryForm
