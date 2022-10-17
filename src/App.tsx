import { ThemeSwitcherProvider } from 'react-css-theme-switcher'

import { Home } from './components/pages'

const themes = {
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.23.5/antd.dark.min.css',
  light: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.23.5/antd.min.css'
}

const systemPrefersDark = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches

const themeStoraged = localStorage.getItem('theme')

let defaultTheme = systemPrefersDark ? 'dark' : 'light'

if (themeStoraged && (themeStoraged === 'light' || themeStoraged === 'dark')) {
  defaultTheme = themeStoraged
}

export function App() {
  return (
    <ThemeSwitcherProvider defaultTheme={defaultTheme} themeMap={themes}>
      <Home />
    </ThemeSwitcherProvider>
  )
}
