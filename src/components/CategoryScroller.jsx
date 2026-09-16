import { Link } from 'react-router-dom'

function CategoryScroller({ categories }) {
  return (
    <section className="category-scroller-section">
      <div className="section-heading">
        <span className="section-eyebrow">Explore</span>
        <h2>Shop by Category</h2>
      </div>

      <div className="category-scroller-wrap">
        <div className="category-scroller">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="category-item"
            >
              <span className="category-circle">
                <img src={category.image} alt="" />
              </span>
              <span className="category-label">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryScroller
