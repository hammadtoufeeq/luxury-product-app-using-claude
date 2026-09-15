import { Link, useNavigate, useParams } from 'react-router-dom'
import products from '../data/products.json'
import ProductDetail from '../components/ProductDetail'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <section className="product-detail">
        <div className="product-detail-inner">
          <p className="not-found">We couldn&rsquo;t find that piece.</p>
          <Link to="/products" className="back-btn">
            &larr; Back to Products
          </Link>
        </div>
      </section>
    )
  }

  return <ProductDetail product={product} onBack={() => navigate('/products')} />
}

export default ProductPage
