import { ButtonProps } from 'antd'

import { Icon } from './styles'

interface CollapseDiffButtonProps extends ButtonProps {
  readonly visible: boolean
  readonly isDiffCollapsed: boolean
}

export function CollapseDiffButton(props: CollapseDiffButtonProps) {
  const { visible, isDiffCollapsed } = props

  if (!visible) {
    return null
  }

  return <Icon isDiffCollapsed={isDiffCollapsed} />
}
