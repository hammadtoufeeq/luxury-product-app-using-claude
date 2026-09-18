import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { useAuth } from '../context/useAuth'

const navLinkClass = ({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`

function Navbar() {
  const { cartCount, clearCart } = useCart()
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    clearCart()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" aria-label="Maison Lumière — home">
          <span className="brand-mark">ML</span>
          <span className="brand-name">Maison Lumière</span>
        </NavLink>

        <nav className="navbar-links">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact Us
          </NavLink>
          <NavLink to="/cart" className={navLinkClass} aria-label="Cart">
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
          {isLoggedIn ? (
            <button className="navbar-link navbar-auth-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
