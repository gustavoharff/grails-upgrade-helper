import { File } from 'react-diff-view'

import { BinaryBadge } from './binary-badge'
import { CollapseDiffButton } from './collapse-diff-button'
import { DiffType } from './diff-type'
import { CollapsableClickArea, Container, FileRenameArrow } from './styles'

interface DiffHeaderProps {
  readonly type: File['type']
  readonly newPath?: string
  readonly oldPath?: string
  readonly hasDiff?: boolean
  readonly newVersion: string
  readonly applicationType: string
  readonly newProfile: string
  readonly isDiffCollapsed: boolean
  readonly setIsDiffCollapsed: (value: boolean) => void
}

export function DiffHeader({
  newPath,
  oldPath,
  type,
  newVersion,
  newProfile,
  applicationType,
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
    return `https://github.com/gustavoharff/grails-diffs/raw/version/${newVersion}-${newProfile}-${applicationType}/${
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
    <Container>
      <CollapsableClickArea
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
      </CollapsableClickArea>

      <div>{renderNewFile()}</div>
    </Container>
  )
}
