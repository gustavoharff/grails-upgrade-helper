import { DownOutlined } from '@ant-design/icons'
import { ButtonProps } from 'antd'
import clsx from 'clsx'

interface CollapseDiffButtonProps extends ButtonProps {
  readonly visible: boolean
  readonly isDiffCollapsed: boolean
}

export function CollapseDiffButton(props: CollapseDiffButtonProps) {
  const { visible, isDiffCollapsed } = props

  if (!visible) {
    return null
  }

  return (
    <DownOutlined
      className={clsx(
        'w-[0.62rem] text-gray-800 origin-center transition-transform ease-in-out',
        {
          '-rotate-90': isDiffCollapsed
        }
      )}
    />
  )
}
