import { useEffect, useState } from 'react'

export function ImageWithLoader({
  src,
  fallbackSrc,
  alt,
  className,
  wrapperClassName,
  loading = 'lazy',
  decoding = 'async',
}) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasFallbackBeenUsed, setHasFallbackBeenUsed] = useState(false)

  useEffect(() => {
    setCurrentSrc(src)
    setIsLoaded(false)
    setHasFallbackBeenUsed(false)
  }, [src])

  const handleError = () => {
    if (!fallbackSrc || hasFallbackBeenUsed || currentSrc === fallbackSrc) {
      setIsLoaded(true)
      return
    }

    setCurrentSrc(fallbackSrc)
    setIsLoaded(false)
    setHasFallbackBeenUsed(true)
  }

  return (
    <div className={`image-shell ${wrapperClassName || ''} ${isLoaded ? 'is-loaded' : 'is-loading'}`}>
      {!isLoaded ? (
        <div className="image-shell-loader" aria-hidden="true">
          <span className="image-shell-spinner" />
        </div>
      ) : null}

      <img
        src={currentSrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
      />
    </div>
  )
}
