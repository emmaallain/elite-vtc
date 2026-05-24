import { useCallback, useEffect, useRef, useState } from 'react'
import { ImageWithLoader } from './ImageWithLoader'

export function VehicleCarousel({ title, gallery, language }) {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(gallery.length > 1)

  const updateScrollState = useCallback(() => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0)
    const epsilon = 2

    setCanScrollLeft(track.scrollLeft > epsilon)
    setCanScrollRight(track.scrollLeft < maxScrollLeft - epsilon)
  }, [])

  useEffect(() => {
    const track = trackRef.current

    if (!track) {
      return undefined
    }

    updateScrollState()
    track.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [gallery.length, updateScrollState])

  const scrollBySlide = (direction) => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const slideWidth = track.firstElementChild?.getBoundingClientRect().width ?? 0
    const gap = 16
    track.scrollBy({ left: direction * (slideWidth + gap), behavior: 'smooth' })
  }

  return (
    <div className="vehicle-carousel">
      <div ref={trackRef} className="vehicle-carousel-track" aria-label={title}>
        {gallery.map((slide) => (
          <figure key={slide.src} className="vehicle-slide">
            <ImageWithLoader
              src={slide.src}
              fallbackSrc={slide.fallbackSrc}
              alt={slide.alt[language]}
              className="vehicle-image"
              wrapperClassName="vehicle-image-shell"
            />
          </figure>
        ))}
      </div>
      {(canScrollLeft || canScrollRight) && (
        <div
          className="vehicle-carousel-topbar"
          style={{
            justifyContent: canScrollLeft && canScrollRight
              ? 'space-between'
              : canScrollRight
                ? 'flex-end'
                : 'flex-start',
          }}
        >
          {canScrollLeft ? (
            <button
              type="button"
              className="carousel-button carousel-button-left"
              onClick={() => scrollBySlide(-1)}
            >
              ←
            </button>
          ) : null}
          {canScrollRight ? (
            <button
              type="button"
              className="carousel-button carousel-button-right"
              onClick={() => scrollBySlide(1)}
            >
              →
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}
