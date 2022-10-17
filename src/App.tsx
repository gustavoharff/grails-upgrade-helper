import { ThemeSwitcherProvider } from 'react-css-theme-switcher'

import { Home } from './components/pages'

const themes = {
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.23.5/antd.dark.min.css',
  light: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.23.5/antd.min.css'
}

export function App() {
  return (
    <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
      <Home />
    </ThemeSwitcherProvider>
  )
}
