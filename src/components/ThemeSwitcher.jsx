import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../hooks/useTheme'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  const icon =
    theme === 'dark' ? (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="switcher-icon" fill="none">
        <path
          d="M14.5 3.5a8.5 8.5 0 1 0 6 14.5 7 7 0 0 1-6-14.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="switcher-icon" fill="none">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    )

  return (
    <button type="button" className="theme-switcher" onClick={toggleTheme}>
      {icon}
      <span>{theme === 'dark' ? t.common.themeLight : t.common.themeDark}</span>
    </button>
  )
}
