import { useEffect, useRef, useState } from 'react'

const SLIDES = [
  { src: '/images/hero4.jpg', position: 'center 49%' },
  { src: '/images/hero.jpg', position: 'center' },
  { src: '/images/hero1.jpg', position: 'center 25%' },
]

const SLIDE_DURATION = 10000
const TRACK_SLIDES = [...SLIDES, SLIDES[0]]

function Hero({ onExplore }) {
  const [index, setIndex] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const trackRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => current + 1)
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [])

  function handleTransitionEnd() {
    if (index === SLIDES.length) {
      setTransitionEnabled(false)
      setIndex(0)
    }
  }

  useEffect(() => {
    if (transitionEnabled) return
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransitionEnabled(true))
    })
    return () => cancelAnimationFrame(frame)
  }, [transitionEnabled])

  const activeDot = index % SLIDES.length

  return (
    <section className="hero">
      <div
        ref={trackRef}
        className="hero-track"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transitionEnabled ? undefined : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {TRACK_SLIDES.map((slide, slideIndex) => (
          <div className="hero-slide" key={`${slide.src}-${slideIndex}`}>
            <img
              src={slide.src}
              alt="Luxury Collection"
              className="hero-image"
              style={{ objectPosition: slide.position }}
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      <div className="hero-overlay">
        <h1 className="hero-title">Timeless Luxury</h1>
        <button className="hero-cta" onClick={onExplore}>
          Discover the Collection
        </button>
      </div>

      <div className="hero-dots">
        {SLIDES.map((slide, dotIndex) => (
          <button
            key={slide.src}
            className={`hero-dot${dotIndex === activeDot ? ' active' : ''}`}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show slide ${dotIndex + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
