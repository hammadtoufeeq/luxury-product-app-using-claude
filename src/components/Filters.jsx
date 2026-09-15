function Filters({ searchTerm, onSearchChange, resultCount }) {
  return (
    <section className="filters" id="collection">
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

      <p className="results-count">
        {resultCount} {resultCount === 1 ? 'piece' : 'pieces'} in the collection
      </p>
    </section>
  )
}

export default Filters
