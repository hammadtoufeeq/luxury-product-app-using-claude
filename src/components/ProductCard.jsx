import { Link } from 'react-router-dom'

function ProductCard({ id, image, name, category, price }) {
  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="image-wrapper">
        <img className="product-image" src={image} alt={name} loading="lazy" />
        <span className="quick-view-btn">View Details</span>
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price.toLocaleString()}</p>
      </div>
    </Link>
  )
}

export default ProductCard
