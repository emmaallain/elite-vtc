import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { SITE_CONFIG } from '../config/siteConfig'
import { useTranslation } from '../hooks/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import { FloatingChatbot } from './FloatingChatbot'

const navKeys = ['home', 'drivers', 'vehicles', 'services', 'concierge', 'yachting', 'partners', 'contact']

const navPaths = {
  home: '/',
  drivers: '/chauffeurs',
  vehicles: '/vehicules',
  services: '/services',
  concierge: '/conciergerie',
  yachting: '/yachting',
  partners: '/partenaires',
  contact: '/contact',
}

export function Layout() {
  const { t, language } = useTranslation()
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
            <h1 className="brand-name">{SITE_CONFIG.brandName}</h1>
          </div>

          <div className="header-tools">
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
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

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
