import { type TagProps, Tag } from 'antd'
import { type File } from 'react-diff-view'

interface DiffTypeProps extends TagProps {
  readonly type: File['type']
}

export function DiffType({ type, ...props }: DiffTypeProps) {
  const colors = {
    new: 'blue',
    add: 'blue',
    modify: 'green',
    delete: 'red',
    rename: 'orange',
    deleted: 'red'
  }

  const labels = {
    new: 'ADDED',
    add: 'ADDED',
    modify: 'MODIFIED',
    delete: 'DELETED',
    deleted: 'DELETED',
    rename: 'RENAMED'
  }

  return (
    <Tag {...props} color={colors[type]}>
      {labels[type]}
    </Tag>
  )
}
