import { useEffect, useRef, useState } from 'react'

const SLIDES = [
  { src: '/images/hero4.jpg', position: 'center 49%' },
  { src: '/images/hero.jpg', position: 'center' },
  { src: '/images/hero1.jpg', position: 'center 25%' },
]

const SLIDE_DURATION = 4000
const TRANSITION_DURATION = 1050
const TRACK_SLIDES = [...SLIDES, SLIDES[0]]

// Fixed at module load, so the slide position keeps advancing on this
// wall-clock timeline even while Hero is unmounted (e.g. on other pages).
const START_TIME = Date.now()

function currentSlideIndex() {
  return Math.floor((Date.now() - START_TIME) / SLIDE_DURATION) % SLIDES.length
}

function msUntilNextSlide() {
  const elapsed = Date.now() - START_TIME
  return SLIDE_DURATION - (elapsed % SLIDE_DURATION)
}

function Hero({ onExplore }) {
  const [index, setIndex] = useState(currentSlideIndex)
  const [transitionEnabled, setTransitionEnabled] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    function scheduleAdvance(delay) {
      timerRef.current = setTimeout(() => {
        if (cancelled) return
        setIndex((current) => {
          const next = current + 1
          if (next === SLIDES.length) {
            scheduleReset()
          } else {
            scheduleAdvance(SLIDE_DURATION)
          }
          return next
        })
      }, delay)
    }

    function scheduleReset() {
      timerRef.current = setTimeout(() => {
        if (cancelled) return
        setTransitionEnabled(false)
        setIndex(0)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!cancelled) setTransitionEnabled(true)
          })
        })
        scheduleAdvance(SLIDE_DURATION)
      }, TRANSITION_DURATION)
    }

    scheduleAdvance(msUntilNextSlide())

    return () => {
      cancelled = true
      clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (transitionEnabled) return
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransitionEnabled(true))
    })
    return () => cancelAnimationFrame(frame)
  }, [transitionEnabled])

  function goToSlide(dotIndex) {
    setIndex(dotIndex)
  }

  const activeDot = index % SLIDES.length

  return (
    <section className="hero">
      <div
        className="hero-track"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transitionEnabled ? undefined : 'none',
        }}
      >
        {TRACK_SLIDES.map((slide, slideIndex) => (
          <div className="hero-slide" key={`${slide.src}-${slideIndex}`}>
            <img
              src={slide.src}
              alt="Luxury Collection"
              className="hero-image"
              style={{ objectPosition: slide.position }}
              loading="eager"
              decoding="async"
              fetchPriority={slideIndex === 0 ? 'high' : 'low'}
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
            onClick={() => goToSlide(dotIndex)}
            aria-label={`Show slide ${dotIndex + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
