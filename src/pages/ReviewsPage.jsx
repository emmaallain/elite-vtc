import { useEffect, useMemo, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { useAdmin } from '../hooks/useAdmin'
import { useTranslation } from '../hooks/useTranslation'

const STORAGE_KEY = 'elite-vtc-reviews'
const DEFAULT_REVIEWS = [
  {
    id: 'default-review-1',
    name: 'Sophie M.',
    message: 'Service impeccable, chauffeur ponctuel et tres professionnel.',
    rating: 5,
    createdAt: '2026-04-12T10:30:00.000Z',
  },
  {
    id: 'default-review-2',
    name: 'Karim A.',
    message: 'Reservation tres fluide et excellente communication avant la course.',
    rating: 5,
    createdAt: '2026-04-25T14:10:00.000Z',
  },
  {
    id: 'default-review-3',
    name: 'Elena R.',
    message: 'Vehicule confortable et accueil premium du debut a la fin.',
    rating: 4,
    createdAt: '2026-05-02T09:00:00.000Z',
  },
]

function getLocale(language) {
  if (language === 'fr') {
    return 'fr-FR'
  }

  if (language === 'ru') {
    return 'ru-RU'
  }

  if (language === 'ar') {
    return 'ar'
  }

  return 'en-US'
}

export function ReviewsPage() {
  const { t, language } = useTranslation()
  const { isAdmin } = useAdmin()
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)

  const locale = useMemo(() => getLocale(language), [language])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)

      if (!raw) {
        setReviews(DEFAULT_REVIEWS)
        return
      }

      const parsed = JSON.parse(raw)

      if (Array.isArray(parsed)) {
        if (parsed.length === 0) {
          setReviews(DEFAULT_REVIEWS)
          return
        }

        setReviews(parsed)
      }
    } catch {
      setReviews(DEFAULT_REVIEWS)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
  }, [reviews])

  const handleSubmit = (event) => {
    event.preventDefault()

    const cleanName = name.trim()
    const cleanMessage = message.trim()

    if (!cleanName || !cleanMessage) {
      return
    }

    const review = {
      id: `${Date.now()}-${Math.round(Math.random() * 10000)}`,
      name: cleanName,
      message: cleanMessage,
      rating,
      createdAt: new Date().toISOString(),
    }

    setReviews((current) => [review, ...current])
    setMessage('')
    setRating(5)
  }

  const handleDeleteReview = (reviewId) => {
    setReviews((current) => current.filter((review) => review.id !== reviewId))
  }

  return (
    <section className="panel reviews-panel">
      <SectionHeading
        title={t.sections.reviews}
        subtitle={t.pages.reviewsIntro}
      />

      <form className="reviews-form" onSubmit={handleSubmit}>
        <label htmlFor="review-name">{t.pages.reviewsNameLabel}</label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t.pages.reviewsNamePlaceholder}
          required
        />

        <span id="review-rating-label">{t.pages.reviewsRatingLabel}</span>
        <div className="reviews-rating-stars" role="radiogroup" aria-labelledby="review-rating-label">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={`review-star-button ${value <= rating ? 'is-active' : ''}`}
              onClick={() => setRating(value)}
              role="radio"
              aria-checked={value === rating}
              aria-label={`${value} ${value > 1 ? 'stars' : 'star'}`}
            >
              ★
            </button>
          ))}
        </div>

        <label htmlFor="review-message">{t.pages.reviewsMessageLabel}</label>
        <textarea
          id="review-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t.pages.reviewsMessagePlaceholder}
          rows={4}
          required
        />

        <button type="submit" className="cta cta-primary">
          {t.pages.reviewsSubmitCta}
        </button>
      </form>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="reviews-empty">{t.pages.reviewsEmpty}</p>
        ) : (
          reviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-card-head">
                <strong>{review.name}</strong>
                <span className="review-stars">{'★'.repeat(review.rating)}</span>
              </div>
              <p>{review.message}</p>
              <time dateTime={review.createdAt}>
                {new Date(review.createdAt).toLocaleDateString(locale, {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>

              {isAdmin ? (
                <button
                  type="button"
                  className="admin-action-button"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Supprimer l'avis
                </button>
              ) : null}
            </article>
          ))
        )}
      </div>
    </section>
  )
}
