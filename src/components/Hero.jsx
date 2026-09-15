function Hero({ onExplore }) {
  return (
    <section className="hero">
      <img src="/images/hero4.jpg" alt="Luxury Collection" className="hero-image" />
      <div className="hero-overlay">
        <h1 className="hero-title">Timeless Luxury</h1>
        <button className="hero-cta" onClick={onExplore}>
          Discover the Collection
        </button>
      </div>
    </section>
  )
}

export default Hero
