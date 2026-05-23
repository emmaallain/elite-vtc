import { useRef } from 'react'

export function VehicleCarousel({ title, gallery, language }) {
  const trackRef = useRef(null)

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
            <img src={slide.src} alt={slide.alt[language]} />
          </figure>
        ))}
      </div>
      <div className="vehicle-carousel-topbar">
        <button type="button" className="carousel-button carousel-button-left" onClick={() => scrollBySlide(-1)}>
          ←
        </button>
        <button type="button" className="carousel-button carousel-button-right" onClick={() => scrollBySlide(1)}>
          →
        </button>
      </div>
    </div>
  )
}
