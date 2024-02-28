import { type TagProps, Tag } from 'antd'
import { type FileData } from 'react-diff-view'

interface DiffTypeProps extends TagProps {
  readonly type: FileData['type']
}

export function DiffType({ type, ...props }: DiffTypeProps) {
  const colors: Record<FileData['type'], string> = {
    add: 'blue',
    modify: 'green',
    delete: 'red',
    rename: 'orange',
    copy: 'purple'
  }

  const labels: Record<FileData['type'], string> = {
    add: 'ADDED',
    modify: 'MODIFIED',
    delete: 'DELETED',
    rename: 'RENAMED',
    copy: 'COPIED'
  }

  return (
    <Tag {...props} color={colors[type]}>
      {labels[type]}
    </Tag>
  )
}
