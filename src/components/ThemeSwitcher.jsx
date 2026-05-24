import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../hooks/useTheme'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  const icon =
    theme === 'dark' ? (
      <MdDarkMode aria-hidden="true" className="switcher-icon" focusable="false" />
    ) : (
      <MdLightMode aria-hidden="true" className="switcher-icon" focusable="false" />
    )

  return (
    <button type="button" className="theme-switcher" onClick={toggleTheme}>
      {icon}
      <span>{theme === 'dark' ? t.common.themeLight : t.common.themeDark}</span>
    </button>
  )
}
