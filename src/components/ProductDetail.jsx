import InquiryForm from './InquiryForm'
import { useCart } from '../context/useCart'
import { useAuth } from '../context/useAuth'

function ProductDetail({ product, onBack }) {
  const { items, addToCart, updateQuantity } = useCart()
  const { requireLogin } = useAuth()

  const cartItem = items.find((item) => item.id === product.id)

  function handleAddToCart() {
    if (!requireLogin()) return
    addToCart(product)
  }

  function handleIncrease() {
    updateQuantity(product.id, cartItem.quantity + 1)
  }

  function handleDecrease() {
    updateQuantity(product.id, cartItem.quantity - 1)
  }

  return (
    <section className="product-detail">
      <div className="product-detail-inner">
        <button className="back-btn" onClick={onBack}>
          &larr; Back to Collection
        </button>

        <div className="product-detail-layout">
          <div className="product-detail-image-wrapper">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <span className="product-category">{product.category}</span>
            <h2>{product.name}</h2>
            <p className="product-detail-price">${product.price.toLocaleString()}</p>

            {cartItem ? (
              <div className="quantity-stepper quantity-stepper-large">
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${product.name}`}
                  onClick={handleDecrease}
                >
                  &minus;
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase quantity of ${product.name}`}
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
            ) : (
              <button className="add-to-cart-btn add-to-cart-btn-large" onClick={handleAddToCart}>
                Add to Cart
              </button>
            )}

            <p className="product-detail-note">
              Each piece is inspected and authenticated before it reaches you,
              accompanied by its original packaging and documentation.
            </p>

            <InquiryForm productName={product.name} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
