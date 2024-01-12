import { DownOutlined } from '@ant-design/icons'
import { type ButtonProps } from 'antd'
import { zinc } from 'tailwindcss/colors'
import { useDarkMode } from 'usehooks-ts'

interface CollapseDiffButtonProps extends ButtonProps {
  readonly visible: boolean
  readonly isDiffCollapsed: boolean
}

export function CollapseDiffButton(props: CollapseDiffButtonProps) {
  const { visible, isDiffCollapsed } = props

  const { isDarkMode } = useDarkMode()

  if (!visible) {
    return null
  }

  return (
    <DownOutlined
      color={isDarkMode ? zinc[100] : zinc[800]}
      className="w-[0.62rem] origin-center transition-transform ease-in-out"
      style={{
        rotate: isDiffCollapsed ? '-90deg' : '0deg'
      }}
    />
  )
}
