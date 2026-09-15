import { NavLink } from 'react-router-dom'
import { useCart } from '../context/useCart'

const navLinkClass = ({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`

function Navbar() {
  const { cartCount } = useCart()

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
        </nav>
      </div>
    </header>
  )
}

export default Navbar
