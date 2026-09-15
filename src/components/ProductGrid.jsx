import ProductCard from './ProductCard'

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No pieces match your search.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          category={product.category}
          price={product.price}
        />
      ))}
    </div>
  )
}

export default ProductGrid
