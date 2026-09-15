export function parseYouTubeUrl(url) {
  if (!url) return null

  let id = null
  let isShort = false

  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      id = parsed.pathname.slice(1)
    } else if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname.startsWith('/shorts/')) {
        id = parsed.pathname.split('/shorts/')[1]
        isShort = true
      } else if (parsed.pathname.startsWith('/embed/')) {
        id = parsed.pathname.split('/embed/')[1]
      } else {
        id = parsed.searchParams.get('v')
      }
    }
  } catch {
    return null
  }

  if (!id) return null
  id = id.split('/')[0].split('?')[0]

  return { id, isShort, embedUrl: `https://www.youtube.com/embed/${id}` }
}
