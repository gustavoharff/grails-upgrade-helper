import { DiffType } from './type'

import { DownOutlined, RightOutlined } from '@ant-design/icons'
import styles from './header.module.css'
import { File } from '../../types'
import styled from '@emotion/styled'
import { ButtonProps, Tag, TagProps } from 'antd'

interface DiffHeaderProps {
  readonly type: File['type']
  readonly newPath?: string
  readonly oldPath?: string
  readonly hasDiff?: boolean
  readonly newVersion: string
  readonly newType: string
  readonly newProfile: string
  readonly isDiffCollapsed: boolean
  readonly setIsDiffCollapsed: (value: boolean) => void
}

const FileRenameArrow = styled(RightOutlined)({
  fontSize: '10px',
  margin: '0 5px',
  color: '#1890ff'
})

interface BinaryBadgeProps extends TagProps {
  visible: boolean
}

function BinaryBadge({ visible, ...props }: BinaryBadgeProps) {
  if (!visible) {
    return null
  }

  return (
    <Tag {...props} color="cyan">
      BINARY
    </Tag>
  )
}

interface CollapseDiffButtonProps extends ButtonProps {
  visible: boolean
  isDiffCollapsed: boolean
}

function CollapseDiffButton(props: CollapseDiffButtonProps) {
  const { visible, isDiffCollapsed } = props

  if (!visible) {
    return null
  }

  return (
    <DownOutlined
      style={{
        width: 10,
        color: '#24292e',
        transform: isDiffCollapsed ? 'rotate(-90deg)' : 'initial',
        transition: 'transform 0.2s ease-in-out',
        transformOrigin: 'center'
      }}
    />
  )
}

export function DiffHeader({
  newPath,
  oldPath,
  type,
  newVersion,
  newProfile,
  newType,
  hasDiff,
  isDiffCollapsed,
  setIsDiffCollapsed
}: DiffHeaderProps) {
  function getPathWithouAppName(path?: string) {
    return path?.replace('myapp/', '').replace('myplugin/', '')
  }

  function getPath() {
    if (type === 'delete') {
      return <span>{getPathWithouAppName(oldPath)}</span>
    }

    if (oldPath !== newPath && type !== 'add') {
      return (
        <span>
          {getPathWithouAppName(oldPath)}
          <FileRenameArrow />
          {getPathWithouAppName(newPath)}
        </span>
      )
    }

    return <span>{getPathWithouAppName(newPath)}</span>
  }

  function getOriginFilePath() {
    return `https://github.com/gustavoharff/grails-diffs/raw/version/${newVersion}-${newProfile}-${newType}/${
      newPath as string
    }`
  }

  function renderNewFile() {
    if (type === 'delete' || type === 'deleted') return null

    return (
      <a target="_blank" href={getOriginFilePath()} rel="noreferrer">
        View file
      </a>
    )
  }

  return (
    <div className={styles.diffHeader}>
      <button
        className={styles.collapsableClickArea}
        onClick={() => setIsDiffCollapsed(!isDiffCollapsed)}
        style={{ cursor: hasDiff ? 'pointer' : 'default' }}
      >
        <CollapseDiffButton
          visible={hasDiff ?? false}
          isDiffCollapsed={isDiffCollapsed}
        />
        {getPath()}
        <DiffType type={type} />
        <BinaryBadge visible={!hasDiff} />
      </button>

      <div>{renderNewFile()}</div>
    </div>
  )
}
