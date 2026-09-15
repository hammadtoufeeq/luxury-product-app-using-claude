import { useState, useEffect, useMemo } from 'react'
import products from './data/products.json'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Filters from './components/Filters'
import ProductGrid from './components/ProductGrid'
import ProductDetail from './components/ProductDetail'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '')
  const [categoryFilter, setCategoryFilter] = useState(localStorage.getItem('categoryupdate') || '')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [],
  )

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || categoryFilter === product.category),
  )

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm)
  }, [searchTerm])

  useEffect(() => {
    localStorage.setItem('categoryupdate', categoryFilter)
  }, [categoryFilter])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [selectedProduct])

  function scrollToCollection() {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleNavCategory(category) {
    setSelectedProduct(null)
    setCategoryFilter(category)
    // wait for the grid view to (re)render before scrolling to it
    requestAnimationFrame(scrollToCollection)
  }

  return (
    <div className="app">
      <Navbar
        categories={categories}
        activeCategory={categoryFilter}
        onSelectCategory={handleNavCategory}
        onHome={() => setSelectedProduct(null)}
      />

      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      ) : (
        <>
          <Hero onExplore={scrollToCollection} />
          <Filters
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            resultCount={filteredProducts.length}
          />
          <ProductGrid products={filteredProducts} onSelect={setSelectedProduct} />
        </>
      )}

      <Footer />
    </div>
  )
}

export default App
