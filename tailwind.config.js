/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Light mode
        'bg-surface': 'var(--light-mode-background-surface-default)',
        'bg-subtle': 'var(--light-mode-background-subtle-default)',
        'bg-subtle-hover': 'var(--light-mode-background-subtle-hover)',
        'bg-primary': 'var(--light-mode-background-primary-default)',
        'bg-primary-hover': 'var(--light-mode-background-primary-hover)',
        'bg-white': 'var(--light-mode-background-white-primary)',
        'bg-white-hover': 'var(--light-mode-background-white-hover)',
        'bg-dark-hue-hover': 'var(--light-mode-background-dark-hue-hover)',
        'text-primary': 'var(--light-mode-texts-primary-default)',
        'text-subtle': 'var(--light-mode-texts-subtle-idle)',
        'border-default': 'var(--light-mode-border-default)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--border-radius-small)',
        md: 'var(--border-radius-medium)',
        lg: 'var(--border-radius-large)',
      },
      spacing: {
        'gap-sm': 'var(--gap-small)',
        'gap-md': 'var(--gap-medium)',
        'gap-lg': 'var(--gap-large)',
        'pad-xs': 'var(--padding-extra-small)',
        'pad-sm': 'var(--padding-small)',
        'pad-md': 'var(--padding-medium)',
        'pad-lg': 'var(--padding-large)',
        'mar-sm': 'var(--margin-small)',
        'mar-md': 'var(--margin-medium)',
        'mar-lg': 'var(--margin-large)',
      },
    },
  },
  plugins: [],
}
