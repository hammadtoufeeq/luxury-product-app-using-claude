import { useState } from 'react'

function InquiryForm({ productName }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Inquiry:', { product: productName, name, email })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="thank-you">
        Thank you! We&rsquo;ll contact you about {productName} soon.
      </p>
    )
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <h3 className="inquiry-title">Request Availability</h3>
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
      <button type="submit">Send Inquiry</button>
    </form>
  )
}

export default InquiryForm
