// The product demo on YouTube ("Demo dashai v0.10"), embedded in the home About section.
export const DEMO_VIDEO_ID = '66t_nVslDIo'

// youtube-nocookie: YouTube sets no cookies until the visitor plays the video.
// The player is only loaded after the visitor presses play, so autoplay starts it right away.
export function demoEmbedUrl(id: string = DEMO_VIDEO_ID): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
}
