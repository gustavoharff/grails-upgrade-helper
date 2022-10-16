import { Tag, TagProps } from 'antd'

interface BinaryBadgeProps extends TagProps {
  visible: boolean
}

export function BinaryBadge({ visible, ...props }: BinaryBadgeProps) {
  if (!visible) {
    return null
  }

  return (
    <Tag {...props} color="cyan">
      BINARY
    </Tag>
  )
}
