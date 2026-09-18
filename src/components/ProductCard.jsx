import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { useAuth } from '../context/useAuth'

function ProductCard({ id, image, name, category, price }) {
  const navigate = useNavigate()
  const { items, addToCart, updateQuantity } = useCart()
  const { requireLogin } = useAuth()

  const cartItem = items.find((item) => item.id === id)

  function goToDetail() {
    navigate(`/product/${id}`)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      goToDetail()
    }
  }

  function handleAddToCart(e) {
    e.stopPropagation()
    if (!requireLogin()) return
    addToCart({ id, image, name, category, price })
  }

  function handleIncrease(e) {
    e.stopPropagation()
    updateQuantity(id, cartItem.quantity + 1)
  }

  function handleDecrease(e) {
    e.stopPropagation()
    updateQuantity(id, cartItem.quantity - 1)
  }

  return (
    <article
      className="product-card"
      onClick={goToDetail}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="image-wrapper">
        <img className="product-image" src={image} alt={name} loading="lazy" />
        <span className="quick-view-btn">View Details</span>
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price.toLocaleString()}</p>
        {cartItem ? (
          <div className="quantity-stepper" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label={`Decrease quantity of ${name}`} onClick={handleDecrease}>
              &minus;
            </button>
            <span>{cartItem.quantity}</span>
            <button type="button" aria-label={`Increase quantity of ${name}`} onClick={handleIncrease}>
              +
            </button>
          </div>
        ) : (
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </article>
  )
}

export default ProductCard
