import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function AuthToast() {
  const { notice, dismissNotice } = useAuth()

  useEffect(() => {
    if (!notice) return undefined
    const timer = setTimeout(dismissNotice, 3500)
    return () => clearTimeout(timer)
  }, [notice, dismissNotice])

  if (!notice) return null

  return (
    <div className="cart-toast auth-toast" role="status">
      <div className="cart-toast-body">
        <p className="cart-toast-message">
          <strong>Please login</strong> to add items to your cart.
        </p>
        <Link to="/login" className="cart-toast-link" onClick={dismissNotice}>
          Login Now
        </Link>
      </div>
      <button className="cart-toast-close" onClick={dismissNotice} aria-label="Dismiss">
        &times;
      </button>
    </div>
  )
}

export default AuthToast
