import { useState } from 'react'
import { parseYouTubeUrl } from '../lib/youtube'

function ProductMedia({ image, videoUrl, name }) {
  const video = parseYouTubeUrl(videoUrl)
  const hasVideo = Boolean(video)
  const [slide, setSlide] = useState('image') // 'image' | 'video'
  const [playing, setPlaying] = useState(false)

  function showImage() {
    setSlide('image')
    setPlaying(false)
  }

  function showVideo() {
    setSlide('video')
  }

  const onVideoSlide = hasVideo && slide === 'video'

  return (
    <div className="product-detail-image-wrapper">
      {onVideoSlide ? (
        playing ? (
          <iframe
            className="media-video-frame"
            src={`${video.embedUrl}?autoplay=1`}
            title={`${name} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button className="media-play-btn" onClick={() => setPlaying(true)}>
            <img src={image} alt="" className="media-play-thumb" />
            <span className="media-play-icon" aria-hidden="true">
              &#9658;
            </span>
            <span className="media-play-label">Play Video</span>
          </button>
        )
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
    </div>
  )
}

export default ProductMedia
