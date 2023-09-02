import { ConfigProvider, theme } from 'antd'
import { type PropsWithChildren } from 'react'
import {
  ThemeSwitcherProvider,
  useThemeSwitcher
} from 'react-css-theme-switcher'

import { Home } from './components/pages'
import { MessageProvider } from './contexts/message'

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

function AntdConfig(props: PropsWithChildren) {
  const { currentTheme } = useThemeSwitcher()

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <MessageProvider>{props.children}</MessageProvider>
    </ConfigProvider>
  )
}

export function App() {
  return (
    <ThemeSwitcherProvider defaultTheme={defaultTheme} themeMap={themes}>
      <AntdConfig>
        <Home />
      </AntdConfig>
    </ThemeSwitcherProvider>
  )
}
