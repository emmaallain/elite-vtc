import { useEffect, useMemo, useRef, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { useAdmin } from '../hooks/useAdmin'
import { useTranslation } from '../hooks/useTranslation'
import { REVIEWS_STORAGE_KEY } from '../utils/adminData'
import { translateText } from '../utils/autoTranslate'
import {
  createCloudReview,
  deleteCloudReview,
  getSupabaseClient,
  readCloudReviews,
} from '../utils/cloudStorage'

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
  const supabase = getSupabaseClient()
  const [reviews, setReviews] = useState([])
  const [isSyncedReady, setIsSyncedReady] = useState(false)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)
  const [syncError, setSyncError] = useState('')
  const [translatedMessages, setTranslatedMessages] = useState({})
  const translatedMessagesRef = useRef({})

  const locale = useMemo(() => getLocale(language), [language])

  useEffect(() => {
    translatedMessagesRef.current = translatedMessages
  }, [translatedMessages])

  useEffect(() => {
    let isMounted = true

    const hydrate = async () => {
      let localReviews = DEFAULT_REVIEWS

      try {
        const raw = localStorage.getItem(REVIEWS_STORAGE_KEY)

        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed) && parsed.length > 0) {
            localReviews = parsed
          }
        }
      } catch {
        localReviews = DEFAULT_REVIEWS
      }

      if (!isMounted) {
        return
      }

      setReviews(localReviews)

      const cloudReviews = await readCloudReviews()

      if (!isMounted) {
        return
      }

      if (Array.isArray(cloudReviews) && cloudReviews.length > 0) {
        setReviews(cloudReviews)
      }

      setIsSyncedReady(true)
    }

    hydrate()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!isSyncedReady) {
      return
    }

    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews))
  }, [reviews, isSyncedReady])

  useEffect(() => {
    if (!isSyncedReady || !supabase) {
      return undefined
    }

    const channel = supabase
      .channel('elite-vtc-reviews-sync')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'elite_reviews',
        },
        async () => {
          const nextReviews = await readCloudReviews()

          if (!Array.isArray(nextReviews)) {
            return
          }

          setReviews(nextReviews)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [isSyncedReady, supabase])

  useEffect(() => {
    if (!isSyncedReady || !supabase) {
      return undefined
    }

    let isMounted = true

    const syncFromCloud = async () => {
      const cloudReviews = await readCloudReviews()

      if (!isMounted || !Array.isArray(cloudReviews)) {
        return
      }

      setReviews((currentReviews) => {
        if (JSON.stringify(currentReviews) === JSON.stringify(cloudReviews)) {
          return currentReviews
        }

        return cloudReviews
      })
    }

    syncFromCloud()

    const intervalId = window.setInterval(syncFromCloud, 10000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [isSyncedReady, supabase])

  useEffect(() => {
    if (!isReviewDialogOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsReviewDialogOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isReviewDialogOpen])

  useEffect(() => {
    if (language === 'fr' || reviews.length === 0) {
      return
    }

    const missingReviews = reviews.filter(
      (review) => !translatedMessagesRef.current[`${review.id}:${language}`] && review.message,
    )

    if (missingReviews.length === 0) {
      return
    }

    let isMounted = true

    const translateMissingReviews = async () => {
      const translatedEntries = await Promise.all(
        missingReviews.map(async (review) => [
          `${review.id}:${language}`,
          await translateText(review.message, language, { sourceLanguage: 'fr' }),
        ]),
      )

      if (!isMounted) {
        return
      }

      setTranslatedMessages((current) => {
        let didChange = false
        const next = { ...current }

        for (const [cacheKey, translatedValue] of translatedEntries) {
          if (!next[cacheKey]) {
            next[cacheKey] = translatedValue
            didChange = true
          }
        }

        return didChange ? next : current
      })
    }

    translateMissingReviews()

    return () => {
      isMounted = false
    }
  }, [reviews, language])

  const handleSubmit = async (event) => {
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

    const nextReviews = [review, ...reviews]
    setSyncError('')
    setReviews(nextReviews)
    setName('')
    setMessage('')
    setRating(5)
    setIsReviewDialogOpen(false)

    const didWriteCloud = await createCloudReview(review)

    if (!didWriteCloud && supabase) {
      setReviews((current) => current.filter((item) => item.id !== review.id))
      setSyncError('Synchronisation impossible avec Supabase pour cet avis.')
    }
  }

  const handleDeleteReview = async (reviewId) => {
    const previousReviews = reviews
    const nextReviews = previousReviews.filter((review) => review.id !== reviewId)

    setSyncError('')
    setReviews(nextReviews)

    const didDeleteCloud = await deleteCloudReview(reviewId)

    if (!didDeleteCloud && supabase) {
      setReviews(previousReviews)
      setSyncError('Suppression impossible dans Supabase pour cet avis.')
    }
  }

  const reviewOpenLabel =
    language === 'fr'
      ? 'Laisser un avis'
      : language === 'ru'
        ? 'Оставить отзыв'
        : language === 'ar'
          ? 'أضف رأيك'
          : 'Write a review'

  const reviewDialogTitle =
    language === 'fr'
      ? 'Votre avis'
      : language === 'ru'
        ? 'Ваш отзыв'
        : language === 'ar'
          ? 'رأيك'
          : 'Your review'

  return (
    <section className="panel reviews-panel">
      <SectionHeading
        title={t.sections.reviews}
        subtitle={t.pages.reviewsIntro}
      />

      <button
        type="button"
        className="cta cta-primary review-open-button"
        onClick={() => setIsReviewDialogOpen(true)}
      >
        {reviewOpenLabel}
      </button>

      {syncError ? <p className="admin-dialog-error">{syncError}</p> : null}

      {isReviewDialogOpen ? (
        <div
          className="review-dialog-overlay"
          role="presentation"
          onClick={() => setIsReviewDialogOpen(false)}
        >
          <section
            className="review-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="review-dialog-title">{reviewDialogTitle}</h3>

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

              <div className="review-dialog-actions">
                <button
                  type="button"
                  className="cta cta-secondary"
                  onClick={() => setIsReviewDialogOpen(false)}
                >
                  {language === 'fr' ? 'Annuler' : language === 'ru' ? 'Отмена' : language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button type="submit" className="cta cta-primary">
                  {t.pages.reviewsSubmitCta}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}

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
              <p>{translatedMessages[`${review.id}:${language}`] || review.message}</p>
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
