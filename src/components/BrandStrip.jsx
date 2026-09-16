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

      <div className="brand-marquee">
        <div className="brand-marquee-track">
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <span className="brand-tag" key={`${brand}-${index}`}>
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandStrip
