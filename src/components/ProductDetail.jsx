import { useState } from 'react'
import InquiryForm from './InquiryForm'
import ProductMedia from './ProductMedia'
import { useCart } from '../context/useCart'

function ProductDetail({ product, onBack }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <section className="product-detail">
      <div className="product-detail-inner">
        <button className="back-btn" onClick={onBack}>
          &larr; Back to Collection
        </button>

        <div className="product-detail-layout">
          <ProductMedia image={product.image} videoUrl={product.videoUrl} name={product.name} />

          <div className="product-detail-info">
            <span className="product-category">{product.category}</span>
            <h2>{product.name}</h2>
            <p className="product-detail-price">${product.price.toLocaleString()}</p>

            <button className="add-to-cart-btn add-to-cart-btn-large" onClick={handleAddToCart}>
              {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>

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
