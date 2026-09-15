import { useEffect, useMemo, useState } from 'react'
import products from '../data/products.json'
import Filters from '../components/Filters'
import ProductGrid from '../components/ProductGrid'

function Products() {
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('searchTerm') || '')
  const [categoryFilter, setCategoryFilter] = useState(
    () => localStorage.getItem('categoryupdate') || '',
  )
  const [priceRange, setPriceRange] = useState('')

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [],
  )

  const [minPrice, maxPrice] = useMemo(() => {
    if (!priceRange) return [0, Infinity]
    return priceRange.split('-').map(Number)
  }, [priceRange])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || categoryFilter === product.category) &&
      product.price >= minPrice &&
      product.price <= maxPrice,
  )

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm)
  }, [searchTerm])

  useEffect(() => {
    localStorage.setItem('categoryupdate', categoryFilter)
  }, [categoryFilter])

  return (
    <section className="products-page">
      <div className="section-heading">
        <span className="section-eyebrow">The Full Collection</span>
        <h2>All Products</h2>
      </div>

      <Filters
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        categories={categories}
        activeCategory={categoryFilter}
        onCategoryChange={setCategoryFilter}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        resultCount={filteredProducts.length}
      />

      <ProductGrid products={filteredProducts} />
    </section>
  )
}

export default Products
