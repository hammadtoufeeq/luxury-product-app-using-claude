const BRANDS = [
  'Rolex',
  'Omega',
  'Patek Philippe',
  'Audemars Piguet',
  'Hermès',
  'Chanel',
  'Louis Vuitton',
  'Gucci',
  'Dior',
  'Tom Ford',
  'Creed',
  'Cartier',
  'Tiffany & Co.',
  'Van Cleef & Arpels',
  'Bulgari',
  'Ray-Ban',
  'Versace',
]

function BrandStrip() {
  return (
    <section className="brand-strip-section">
      <div className="section-heading">
        <span className="section-eyebrow">Trusted Houses</span>
        <h2>Our Brands</h2>
      </div>

      <div className="brand-strip">
        {BRANDS.map((brand) => (
          <span className="brand-tag" key={brand}>
            {brand}
          </span>
        ))}
      </div>
    </section>
  )
}

export default BrandStrip
