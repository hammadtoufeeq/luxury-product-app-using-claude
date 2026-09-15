import { useState } from 'react'
import { motion } from 'framer-motion'
import InquiryForm from './InquiryForm'
import ProductMedia from './ProductMedia'
import { useCart } from '../context/useCart'

function ProductDetail({ product, onBack }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [theaterMode, setTheaterMode] = useState(false)

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

        <motion.div layout className={`product-detail-layout ${theaterMode ? 'theater-mode' : ''}`}>
          <ProductMedia
            image={product.image}
            videoUrl={product.videoUrl}
            name={product.name}
            theaterMode={theaterMode}
            onEnterTheater={() => setTheaterMode(true)}
            onExitTheater={() => setTheaterMode(false)}
          />

          <motion.div layout className="product-detail-info">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductDetail
