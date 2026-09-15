import { useState } from 'react'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Contact message:', { name, email, message })
    setSubmitted(true)
  }

  return (
    <section className="static-page contact-page">
      <div className="section-heading">
        <span className="section-eyebrow">Get in Touch</span>
        <h2>Contact Us</h2>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="contact-info-item">
            <h3>Showroom</h3>
            <p>128 Rue de la Lumière, Paris, France</p>
          </div>
          <div className="contact-info-item">
            <h3>Client Care</h3>
            <p>concierge@maisonlumiere.example</p>
            <p>+33 1 23 45 67 89</p>
          </div>
          <div className="contact-info-item">
            <h3>Hours</h3>
            <p>Monday – Saturday, 10:00 – 19:00</p>
          </div>
        </div>

        <div className="contact-form-wrap">
          {submitted ? (
            <p className="thank-you">
              Thank you, {name || 'friend'}. Your message has been received — our team will
              respond within one business day.
            </p>
          ) : (
            <form className="inquiry-form contact-form" onSubmit={handleSubmit}>
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
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
              <button type="submit">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
