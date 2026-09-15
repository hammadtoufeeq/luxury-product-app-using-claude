function ProductCard({ image, name, category, price, onView }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onView()
    }
  }

  return (
    <article
      className="product-card"
      onClick={onView}
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
      </div>
    </article>
  )
}

export default ProductCard
