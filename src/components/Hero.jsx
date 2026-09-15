function Hero({ onExplore }) {
  return (
    <>
      <section className="hero">
        <img src="/images/hero4.jpg" alt="Luxury Collection" className="hero-image" />
      </section>

      <section className="hero-caption">
        <span className="hero-eyebrow">The Autumn Edit</span>
        <h1 className="hero-title">Timeless Luxury, Curated for You</h1>
        <p className="hero-subtitle">
          Exceptional watches, leather goods, fragrance and fine jewelry — sourced
          for those who value the extraordinary.
        </p>
        <button className="hero-cta" onClick={onExplore}>
          Discover the Collection
        </button>
      </section>
    </>
  )
}

export default Hero
