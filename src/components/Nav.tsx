import { useTheme } from '../context/ThemeContext'

interface NavProps {
  name: string
  page: string
  /** When provided the name pill becomes a back button */
  onNameClick?: () => void
}

export function Nav({ name, page, onNameClick }: NavProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <nav className="flex items-center gap-2">
      {/* Name — clickable back pill when onNameClick is provided */}
      <span
        role={onNameClick ? 'button' : undefined}
        tabIndex={onNameClick ? 0 : undefined}
        onClick={onNameClick}
        onKeyDown={onNameClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onNameClick() } : undefined}
        className="px-2 py-0.5 rounded-md text-label-small cursor-default select-none transition-colors duration-150"
        style={{
          border: isDark ? 'none' : '0.5px solid var(--color-border)',
          backgroundColor: isDark ? 'var(--dark-mode-background-primary-default)' : 'transparent',
          color: isDark ? 'var(--dark-mode-texts-primary-default)' : 'var(--color-text-subtle)',
          cursor: onNameClick ? 'pointer' : 'default',
        }}
      >
        {onNameClick && (
          <span style={{ marginRight: '4px', opacity: 0.7 }}>←</span>
        )}
        {name}
      </span>

      {/* Separator */}
      <span className="text-label-small" style={{ color: 'var(--color-text-subtle)', opacity: 0.6 }}>/</span>

      {/* Page — bordered pill (light) / plain text (dark) */}
      {isDark ? (
        <span
          className="text-label-small"
          style={{ color: 'var(--dark-mode-texts-primary-default)' }}
        >
          {page}
        </span>
      ) : (
        <span
          className="px-2 py-0.5 rounded-md text-label-small cursor-default select-none transition-colors duration-150"
          style={{
            border: '0.5px solid var(--color-border)',
            color: 'var(--color-text-subtle)',
          }}
        >
          {page}
        </span>
      )}
    </nav>
  )
}
