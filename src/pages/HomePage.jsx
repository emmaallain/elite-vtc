import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { MdGroups, MdLanguage, MdSchedule, MdStar, MdPublic } from 'react-icons/md'
import { ImageWithLoader } from '../components/ImageWithLoader'
import { SectionHeading } from '../components/SectionHeading'
import { useTranslation } from '../hooks/useTranslation'
import { getMediaSource } from '../utils/media'

const trustIconByKey = {
  group: MdGroups,
  public: MdPublic,
  schedule: MdSchedule,
  star: MdStar,
  translate: MdLanguage,
}

export function HomePage() {
  const { t, language } = useTranslation()
  const stats = t.trust.stats
  const animationKey = 'elite-vtc-trust-stats-animated'
  const rawCarouselFolder = import.meta.env.VITE_HOMEPAGE_CAROUSEL_FOLDER
  const carouselFolder = rawCarouselFolder === undefined ? 'homepage-carousel' : rawCarouselFolder.trim()

  const bannerSources = useMemo(() => {
    const envList = import.meta.env.VITE_HOMEPAGE_CAROUSEL_IMAGES

    if (!envList) {
      return ['slide-1.jpg', 'slide-2.jpg', 'slide-3.jpg']
    }

    const parsedSources = envList
      .split(',')
      .map((source) => source.trim())
      .filter(Boolean)

    return parsedSources.length > 0
      ? parsedSources
      : ['slide-1.jpg', 'slide-2.jpg', 'slide-3.jpg']
  }, [])

  const bannerSlides = useMemo(
    () => {
      const slides = bannerSources.map((source, index) => {
        const isUrlSource = /^https?:\/\//i.test(source)

        if (isUrlSource) {
          return {
            id: `banner-url-${index}`,
            src: source,
            fallbackSrc: `${import.meta.env.BASE_URL}photos/homepage-carousel/slide-1.jpg`,
            alt:
              language === 'fr'
                ? `Banniere Elite VTC ${index + 1}`
                : `Elite VTC banner ${index + 1}`,
          }
        }

        const fileName = source.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '')

        return {
          id: `banner-${fileName}-${index}`,
          ...getMediaSource(`homepage-carousel/${fileName}`, {
            cloudinaryPath: carouselFolder ? `${carouselFolder}/${fileName}` : `/${fileName}`,
            localPath: `homepage-carousel/${fileName}.jpg`,
            width: 1800,
          }),
          alt:
            language === 'fr'
              ? `Banniere Elite VTC ${index + 1}`
              : `Elite VTC banner ${index + 1}`,
        }
      })

      const shuffledSlides = [...slides]

      for (let i = shuffledSlides.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const currentSlide = shuffledSlides[i]
        shuffledSlides[i] = shuffledSlides[randomIndex]
        shuffledSlides[randomIndex] = currentSlide
      }

      return shuffledSlides
    },
    [bannerSources, carouselFolder, language],
  )

  const initialValues = useMemo(
    () => Object.fromEntries(stats.map((stat) => [stat.id, 0])),
    [stats],
  )

  const finalValues = useMemo(
    () => Object.fromEntries(stats.map((stat) => [stat.id, stat.value])),
    [stats],
  )

  const [counterValues, setCounterValues] = useState(initialValues)
  const [currentBanner, setCurrentBanner] = useState(0)
  const canGoPrevBanner = currentBanner > 0
  const canGoNextBanner = currentBanner < bannerSlides.length - 1

  useEffect(() => {
    setCurrentBanner(0)
  }, [bannerSlides])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentBanner((current) => (current + 1) % bannerSlides.length)
    }, 4800)

    return () => window.clearInterval(intervalId)
  }, [bannerSlides.length])

  useEffect(() => {
    const hasAnimated = window.sessionStorage.getItem(animationKey) === 'true'

    if (hasAnimated) {
      setCounterValues(finalValues)
      return
    }

    let animationFrameId
    const animationDuration = 1400
    const startTime = performance.now()

    const animateCounters = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / animationDuration, 1)
      const nextValues = Object.fromEntries(
        stats.map((stat) => [stat.id, Math.round(stat.value * progress)]),
      )

      setCounterValues(nextValues)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCounters)
      } else {
        window.sessionStorage.setItem(animationKey, 'true')
      }
    }

    setCounterValues(initialValues)
    animationFrameId = requestAnimationFrame(animateCounters)

    return () => cancelAnimationFrame(animationFrameId)
  }, [animationKey, finalValues, initialValues, stats])

  return (
    <>
      <section className="hero-panel">
        <h2 className="hero-title">{t.hero.title}</h2>
        <p className="hero-subtitle">{t.hero.subtitle}</p>

        <section className="home-banner-panel" aria-label="Homepage visual banner">
          <ImageWithLoader
            src={bannerSlides[currentBanner].src}
            fallbackSrc={bannerSlides[currentBanner].fallbackSrc}
            alt={bannerSlides[currentBanner].alt}
            className="home-banner-image"
            wrapperClassName="home-banner-image-shell"
            loading="eager"
            decoding="async"
          />

          <div
            className="home-banner-controls"
            aria-label="Banner controls"
            style={{
              justifyContent: canGoPrevBanner && canGoNextBanner
                ? 'space-between'
                : canGoNextBanner
                  ? 'flex-end'
                  : 'flex-start',
            }}
          >
            {canGoPrevBanner ? (
              <button
                type="button"
                className="home-banner-button carousel-button"
                onClick={() => setCurrentBanner((current) => Math.max(current - 1, 0))}
                aria-label={language === 'fr' ? 'Image precedente' : 'Previous image'}
              >
                ←
              </button>
            ) : null}
            {canGoNextBanner ? (
              <button
                type="button"
                className="home-banner-button carousel-button"
                onClick={() =>
                  setCurrentBanner((current) => Math.min(current + 1, bannerSlides.length - 1))
                }
                aria-label={language === 'fr' ? 'Image suivante' : 'Next image'}
              >
                →
              </button>
            ) : null}
          </div>

          <div className="home-banner-dots" aria-hidden="true">
            {bannerSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`home-banner-dot ${index === currentBanner ? 'home-banner-dot-active' : ''}`}
                onClick={() => setCurrentBanner(index)}
                aria-label={language === 'fr' ? `Aller a l image ${index + 1}` : `Go to image ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <div className="hero-actions">
          <Link className="cta cta-secondary" to="/services">
            {t.hero.ctaSecondary} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="panel trust-panel">
        <SectionHeading title={t.trust.title} />
        <ul className="trust-list trust-stats" aria-label={t.trust.title}>
          {stats.map((stat) => {
            const TrustIcon = trustIconByKey[stat.icon]

            return (
              <li key={stat.id} className="trust-stat-card">
                <p className="trust-stat-value">
                  {stat.prefix || ''}
                  {counterValues[stat.id] ?? 0}
                  {stat.suffix || ''}
                </p>
                <p className="trust-stat-label">
                  <span className={`trust-stat-emoji trust-stat-emoji-${stat.id}`} aria-hidden="true">
                    {TrustIcon ? <TrustIcon focusable="false" /> : '•'}
                  </span>
                  {stat.label}
                </p>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
