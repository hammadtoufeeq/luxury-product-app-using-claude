import { useState } from 'react'
import { motion } from 'framer-motion'
import { parseYouTubeUrl } from '../lib/youtube'

function ProductMedia({ image, videoUrl, name, theaterMode, onEnterTheater, onExitTheater }) {
  const video = parseYouTubeUrl(videoUrl)
  const hasVideo = Boolean(video)
  const [slide, setSlide] = useState('image') // 'image' | 'video'

  function showImage() {
    setSlide('image')
  }

  function showVideo() {
    setSlide('video')
  }

  function handleClose() {
    setSlide('image')
    onExitTheater()
  }

  if (theaterMode && video) {
    return (
      <motion.div
        layout
        className={`product-media-theater ${video.isShort ? 'is-vertical' : 'is-wide'}`}
        initial={{ opacity: 0, scale: 0.9, y: -18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="media-theater-close"
          onClick={handleClose}
          aria-label="Close video"
        >
          &times;
        </button>
        <iframe
          className="media-video-frame"
          src={`${video.embedUrl}?autoplay=1`}
          title={`${name} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </motion.div>
    )
  }

  const onVideoSlide = hasVideo && slide === 'video'

  return (
    <motion.div layout className="product-detail-image-wrapper">
      {onVideoSlide ? (
        <button className="media-play-btn" onClick={onEnterTheater}>
          <img src={image} alt="" className="media-play-thumb" />
          <span className="media-play-icon" aria-hidden="true">
            &#9658;
          </span>
          <span className="media-play-label">Play Video</span>
        </button>
      ) : (
        <img src={image} alt={name} />
      )}

      {hasVideo && (
        <>
          <button
            type="button"
            className="media-arrow media-arrow-left"
            onClick={showImage}
            disabled={slide === 'image'}
            aria-label="Show product photo"
          >
            &#8249;
          </button>
          <button
            type="button"
            className="media-arrow media-arrow-right"
            onClick={showVideo}
            disabled={slide === 'video'}
            aria-label="Show product video"
          >
            &#8250;
          </button>

          <div className="media-dots">
            <span className={slide === 'image' ? 'is-active' : ''} />
            <span className={slide === 'video' ? 'is-active' : ''} />
          </div>
        </>
      )}
    </motion.div>
  )
}

export default ProductMedia
