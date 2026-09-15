const VALUES = [
  {
    title: 'Authenticity',
    text: 'Every piece is inspected and verified by our in-house specialists before it ever reaches a client.',
  },
  {
    title: 'Craftsmanship',
    text: 'We work only with maisons and ateliers whose standards of construction and finish match our own.',
  },
  {
    title: 'Discretion',
    text: 'From inquiry to delivery, every transaction is handled with the privacy our clients expect.',
  },
]

const STATS = [
  { value: '15+', label: 'Years Curating' },
  { value: '20', label: 'Signature Pieces' },
  { value: '5', label: 'Categories' },
  { value: '100%', label: 'Authenticated' },
]

function About() {
  return (
    <section className="static-page about-page">
      <div className="section-heading">
        <span className="section-eyebrow">Our Story</span>
        <h2>Maison Lumière</h2>
      </div>

      <div className="prose">
        <p>
          Founded on the belief that true luxury is quiet, considered, and built to last, Maison
          Lumière curates an intimate collection of watches, leather goods, fragrance, and fine
          jewelry from the world&rsquo;s most respected houses.
        </p>
        <p>
          We don&rsquo;t chase trends. Every piece in our collection is chosen for its craftsmanship,
          its provenance, and its ability to be worn — or gifted — for a lifetime. Our team works
          directly with trusted sources to ensure that what you see is exactly what arrives at your
          door.
        </p>
      </div>

      <div className="stats-row">
        {STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="values-grid">
        {VALUES.map((value) => (
          <div className="value-card" key={value.title}>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default About
