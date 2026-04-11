import { useTheme } from '../context/ThemeContext'

interface NavProps {
  name: string
  page: string
}

export function Nav({ name, page }: NavProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <nav className="flex items-center gap-2">
      {/* Name — bordered pill (light) / filled pill (dark) */}
      <span
        className="px-2 py-0.5 rounded-md text-xs font-medium cursor-default select-none transition-colors duration-150"
        style={{
          border: isDark ? 'none' : '0.5px solid var(--color-border)',
          backgroundColor: isDark ? 'var(--dark-mode-background-primary-default)' : 'transparent',
          color: isDark ? 'var(--dark-mode-texts-primary-default)' : 'var(--color-text-subtle)',
        }}
      >
        {name}
      </span>

      {/* Separator */}
      <span className="text-xs font-medium" style={{ color: 'var(--color-text-subtle)', opacity: 0.6 }}>/</span>

      {/* Page — bordered pill (light) / plain text (dark) */}
      {isDark ? (
        <span
          className="text-xs font-medium"
          style={{ color: 'var(--dark-mode-texts-primary-default)' }}
        >
          {page}
        </span>
      ) : (
        <span
          className="px-2 py-0.5 rounded-md text-xs font-medium cursor-default select-none transition-colors duration-150"
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
