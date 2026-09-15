import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

function CartToast() {
  const { toast, dismissToast } = useCart()

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(dismissToast, 3500)
    return () => clearTimeout(timer)
  }, [toast, dismissToast])

  if (!toast) return null

  return (
    <div className="cart-toast" role="status">
      <img src={toast.image} alt="" className="cart-toast-image" />
      <div className="cart-toast-body">
        <p className="cart-toast-message">
          <strong>{toast.name}</strong> added to cart
        </p>
        <Link to="/cart" className="cart-toast-link" onClick={dismissToast}>
          View Cart
        </Link>
      </div>
      <button className="cart-toast-close" onClick={dismissToast} aria-label="Dismiss">
        &times;
      </button>
    </div>
  )
}

export default CartToast
