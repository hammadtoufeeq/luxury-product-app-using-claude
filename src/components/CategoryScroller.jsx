import { useRef } from 'react'
import { Link } from 'react-router-dom'

function CategoryScroller({ categories }) {
  const scrollerRef = useRef(null)

  function scrollBy(amount) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="category-scroller-section">
      <div className="section-heading">
        <span className="section-eyebrow">Explore</span>
        <h2>Shop by Category</h2>
      </div>

      <div className="category-scroller-wrap">
        <button
          type="button"
          className="scroller-arrow scroller-arrow-left"
          onClick={() => scrollBy(-320)}
          aria-label="Scroll categories left"
        >
          &#8249;
        </button>

        <div className="category-scroller" ref={scrollerRef}>
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

        <button
          type="button"
          className="scroller-arrow scroller-arrow-right"
          onClick={() => scrollBy(320)}
          aria-label="Scroll categories right"
        >
          &#8250;
        </button>
      </div>
    </section>
  )
}

export default CategoryScroller
