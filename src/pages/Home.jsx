import { Link } from 'react-router-dom'
import products from '../data/products.json'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import CategoryScroller from '../components/CategoryScroller'
import BrandStrip from '../components/BrandStrip'

const TOP_SELLER_IDS = [1, 5, 9, 13, 17, 3]

function Home() {
  const topSellers = TOP_SELLER_IDS.map((id) => products.find((product) => product.id === id)).filter(
    Boolean,
  )

  const categories = [...new Set(products.map((product) => product.category))].map((name) => ({
    name,
    image: products.find((product) => product.category === name).image,
  }))

  function scrollToTopSellers() {
    document.getElementById('top-sellers')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Hero onExplore={scrollToTopSellers} />

      <CategoryScroller categories={categories} />

      <section className="top-sellers" id="top-sellers">
        <div className="section-heading">
          <span className="section-eyebrow">Best Sellers</span>
          <h2>Our Top Picks</h2>
        </div>

        <ProductGrid products={topSellers} />
      </section>

      <BrandStrip />

      <div className="view-all-wrap">
        <Link to="/products" className="hero-cta">
          View All Products
        </Link>
      </div>
    </>
  )
}

export default Home
