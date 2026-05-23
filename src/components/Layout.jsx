import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { SITE_CONFIG } from '../config/siteConfig'
import { useTranslation } from '../hooks/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton'

const navKeys = ['home', 'drivers', 'vehicles', 'services', 'pricing', 'contact']

const navPaths = {
  home: '/',
  drivers: '/chauffeurs',
  vehicles: '/vehicules',
  services: '/services',
  pricing: '/tarifs',
  contact: '/contact',
}

export function Layout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

  return (
    <>
      <header className="site-header">
        <div className="header-top">
          <div className="brand-block">
            <p className="brand-kicker">Elite Private Mobility</p>
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

      <WhatsAppFloatingButton />
    </>
  )
}
