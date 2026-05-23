const MEDIA_BASE = `${import.meta.env.BASE_URL}photos`

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim()
const CLOUDINARY_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER?.trim()
const CLOUDINARY_TRANSFORMS =
  import.meta.env.VITE_CLOUDINARY_TRANSFORMS?.trim() || 'f_auto,q_auto'

const normalizeFolder = (folder) => folder?.replace(/^\/+|\/+$/g, '')

export function getMediaSource(relativePath, options = {}) {
  const localSrc = `${MEDIA_BASE}/${relativePath}`

  if (!CLOUDINARY_CLOUD_NAME) {
    return {
      src: localSrc,
      fallbackSrc: localSrc,
    }
  }

  const folder = normalizeFolder(CLOUDINARY_FOLDER)
  const uploadPath = folder ? `${folder}/${relativePath}` : relativePath
  const widthTransform = options.width ? `,w_${options.width}` : ''
  const transforms = `${CLOUDINARY_TRANSFORMS}${widthTransform}`

  return {
    src: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${encodeURI(uploadPath)}`,
    fallbackSrc: localSrc,
  }
}
