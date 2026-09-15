function ProductCard({ image, name, category, price, onView }) {
  return (
    <article className="product-card">
      <div className="image-wrapper">
        <img className="product-image" src={image} alt={name} loading="lazy" />
        <button className="quick-view-btn" onClick={onView}>
          View Details
        </button>
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
