import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Purchase request:', { name, email, items, total: cartTotal })
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <section className="static-page cart-page">
        <div className="section-heading">
          <span className="section-eyebrow">Request Received</span>
          <h2>Thank You, {name}</h2>
        </div>
        <p className="thank-you cart-thank-you">
          We&rsquo;ve received your purchase request and will reach out at {email} shortly to
          confirm availability and arrange payment.
        </p>
        <div className="view-all-wrap">
          <Link to="/products" className="hero-cta">
            Continue Browsing
          </Link>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="static-page cart-page">
        <div className="section-heading">
          <span className="section-eyebrow">Your Selection</span>
          <h2>Cart</h2>
        </div>
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <div className="view-all-wrap">
            <Link to="/products" className="hero-cta">
              Browse the Collection
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="static-page cart-page">
      <div className="section-heading">
        <span className="section-eyebrow">Your Selection</span>
        <h2>Cart</h2>
      </div>

      <div className="cart-layout">
        <ul className="cart-items">
          {items.map((item) => (
            <li className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`} className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="cart-item-info">
                <span className="product-category">{item.category}</span>
                <h3>
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </h3>
                <p className="cart-item-price">${item.price.toLocaleString()}</p>
              </div>

              <div className="cart-item-quantity">
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${item.name}`}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  &minus;
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase quantity of ${item.name}`}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <p className="cart-item-subtotal">${(item.price * item.quantity).toLocaleString()}</p>

              <button
                type="button"
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toLocaleString()}</span>
          </div>
          <p className="cart-summary-note">
            Final pricing and availability will be confirmed by our concierge team.
          </p>

          <form className="inquiry-form" onSubmit={handleSubmit}>
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
            <button type="submit">Submit Purchase Request</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Cart
