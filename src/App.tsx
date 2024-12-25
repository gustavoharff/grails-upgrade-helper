import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { type PropsWithChildren, useEffect } from 'react'
import { useDarkMode } from 'usehooks-ts'

import { Home } from './components/pages'

function AntdConfig(props: PropsWithChildren) {
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-prefers-color', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-prefers-color', 'light')
    }
  }, [isDarkMode])

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorBorder: isDarkMode ? '#3a3f42' : '#d7dbdf'
        },
        components: {
          Card: {
            colorBgContainer: isDarkMode ? '#151718' : '#f8f9fa',
            colorBorderSecondary: isDarkMode ? '#3a3f42' : '#d7dbdf'
          }
        }
      }}
    >
      <AntdApp>
        {props.children}
      </AntdApp>

    </ConfigProvider>
  )
}

export function App() {
  return (
    <AntdConfig>
      <Home />
    </AntdConfig>
  )
}
