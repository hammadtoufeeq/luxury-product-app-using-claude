function Navbar({ categories, activeCategory, onSelectCategory, onHome }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="brand" onClick={onHome} aria-label="Maison Lumière — home">
          <span className="brand-mark">ML</span>
          <span className="brand-name">Maison Lumière</span>
        </button>

        <nav className="navbar-links">
          <button
            className={`navbar-link ${activeCategory === '' ? 'is-active' : ''}`}
            onClick={() => onSelectCategory('')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`navbar-link ${activeCategory === category ? 'is-active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
