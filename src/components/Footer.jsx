import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="brand-mark">ML</span>
        <p className="footer-tagline">Maison Lumière — Curated Luxury, Delivered with Care</p>

        <nav className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <p className="footer-copyright">&copy; {new Date().getFullYear()} Maison Lumière. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
