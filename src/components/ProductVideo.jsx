import { parseYouTubeUrl } from '../lib/youtube'

function ProductVideo({ videoUrl, productName }) {
  const video = parseYouTubeUrl(videoUrl)
  if (!video) return null

  return (
    <section className="product-video">
      <div className="section-heading">
        <span className="section-eyebrow">In Motion</span>
        <h2>See It In Detail</h2>
      </div>

      <div className={`product-video-frame ${video.isShort ? 'product-video-frame-vertical' : ''}`}>
        <iframe
          src={video.embedUrl}
          title={`${productName} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default ProductVideo
