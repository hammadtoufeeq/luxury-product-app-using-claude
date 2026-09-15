const PRICE_RANGES = [
  { value: '', label: 'Any Price' },
  { value: '0-500', label: 'Under $500' },
  { value: '500-2000', label: '$500 – $2,000' },
  { value: '2000-10000', label: '$2,000 – $10,000' },
  { value: '10000-Infinity', label: '$10,000 & Above' },
]

function Filters({
  searchTerm,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  resultCount,
}) {
  return (
    <section className="filters">
      <div className="search-field">
        <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M13.5 13.5 18 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          className="search-box"
          type="text"
          placeholder="Search luxury items..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      <div className="filter-row">
        <div className="category-pills">
          <button
            className={`pill ${activeCategory === '' ? 'is-active' : ''}`}
            onClick={() => onCategoryChange('')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`pill ${activeCategory === category ? 'is-active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <select
          className="price-select"
          value={priceRange}
          onChange={(e) => onPriceRangeChange(e.target.value)}
          aria-label="Filter by price"
        >
          {PRICE_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <p className="results-count">
        {resultCount} {resultCount === 1 ? 'piece' : 'pieces'} in the collection
      </p>
    </section>
  )
}

export default Filters
