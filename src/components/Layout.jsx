import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { SITE_CONFIG } from '../config/siteConfig'
import { useAdmin } from '../hooks/useAdmin'
import { useTranslation } from '../hooks/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import { FloatingChatbot } from './FloatingChatbot'

const navKeys = ['home', 'drivers', 'vehicles', 'services', 'concierge', 'yachting', 'partners', 'reviews', 'contact']

const navPaths = {
  home: '/',
  drivers: '/chauffeurs',
  vehicles: '/vehicules',
  services: '/services',
  concierge: '/conciergerie',
  yachting: '/yachting',
  partners: '/partenaires',
  reviews: '/avis',
  contact: '/contact',
}

export function Layout() {
  const { t, language } = useTranslation()
  const {
    isAdmin,
    adminSessionEmail,
    isSupabaseAuthEnabled,
    canUseLegacyCodeMode,
    isAdminDialogOpen,
    adminCodeInput,
    adminEmailInput,
    adminPasswordInput,
    adminError,
    isSubmittingAuth,
    requestAdminAccess,
    setAdminCodeInput,
    setAdminEmailInput,
    setAdminPasswordInput,
    submitAdminCode,
    closeAdminDialog,
    disableAdmin,
  } = useAdmin()
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  return (
    <>
      <header className="site-header">
        <div className="header-top">
          <div className="brand-block">
            <button
              type="button"
              className="brand-name brand-name-trigger"
              onClick={requestAdminAccess}
              aria-label="Admin access"
            >
              {SITE_CONFIG.brandName}
            </button>
          </div>

          <div className="header-tools">
            {isAdmin ? (
              <div className="admin-chip-group">
                {adminSessionEmail ? (
                  <span className="admin-email-chip" title={adminSessionEmail}>
                    Admin: {adminSessionEmail}
                  </span>
                ) : null}
                <button
                  type="button"
                  className="admin-pill"
                  onClick={disableAdmin}
                >
                  Admin ON
                </button>
              </div>
            ) : null}
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>

        <nav className="site-nav" aria-label="Primary">
          {navKeys.map((key) => (
            <NavLink
              key={key}
              to={navPaths[key]}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {t.nav[key]}
            </NavLink>
          ))}

          {isAdmin ? (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              Admin
            </NavLink>
          ) : null}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      {isAdminDialogOpen ? (
        <div className="admin-dialog-overlay" role="presentation" onClick={closeAdminDialog}>
          <section
            className="admin-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="admin-dialog-title">{isSupabaseAuthEnabled ? 'Connexion admin' : 'Acces admin'}</h2>

            {isSupabaseAuthEnabled ? (
              <>
                <input
                  type="email"
                  value={adminEmailInput}
                  onChange={(event) => setAdminEmailInput(event.target.value)}
                  placeholder="Email admin"
                  autoFocus
                />
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(event) => setAdminPasswordInput(event.target.value)}
                  placeholder="Mot de passe"
                />
              </>
            ) : canUseLegacyCodeMode ? (
              <input
                type="password"
                value={adminCodeInput}
                onChange={(event) => setAdminCodeInput(event.target.value)}
                placeholder="Code secret"
                autoFocus
              />
            ) : (
              <p className="admin-dialog-error">
                Mode admin verrouille: configurez Supabase pour vous connecter.
              </p>
            )}

            {adminError ? <p className="admin-dialog-error">{adminError}</p> : null}
            <div className="admin-dialog-actions">
              <button type="button" className="cta cta-secondary" onClick={closeAdminDialog}>Annuler</button>
              <button
                type="button"
                className="cta cta-primary"
                onClick={submitAdminCode}
                disabled={isSubmittingAuth || (!isSupabaseAuthEnabled && !canUseLegacyCodeMode)}
              >
                {isSupabaseAuthEnabled ? 'Se connecter' : 'Activer'}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {isHomePage ? (
        <footer className="site-footer">
          <p>{SITE_CONFIG.brandName}</p>
          <p>{SITE_CONFIG.serviceArea}</p>
          <p>{t.pages.footerNote}</p>
        </footer>
      ) : null}

      <FloatingChatbot />
    </>
  )
}
