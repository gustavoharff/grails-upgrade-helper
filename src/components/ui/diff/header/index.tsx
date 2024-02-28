import { RightOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { type FileData } from 'react-diff-view'

import { BinaryBadge } from './binary-badge'
import { CollapseDiffButton } from './collapse-diff-button'
import { DiffType } from './diff-type'

interface DiffHeaderProps {
  readonly type: FileData['type']
  readonly newPath?: string
  readonly oldPath?: string
  readonly hasDiff?: boolean
  readonly newVersion: string
  readonly applicationType: string
  readonly newProfile: string
  readonly isDiffCollapsed: boolean
  readonly setIsDiffCollapsed: (value: boolean) => void
}

export function DiffHeader(props: DiffHeaderProps) {
  const {
    newPath,
    oldPath,
    type,
    newVersion,
    newProfile,
    applicationType,
    hasDiff,
    isDiffCollapsed,
    setIsDiffCollapsed
  } = props

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

          <RightOutlined className="text-[0.60rem] my-0 mx-2 text-blue-600" />

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
    if (type === 'delete') return null

    return (
      <a
        className="text-blue-600 no-underline hover:underline"
        target="_blank"
        href={getOriginFilePath()}
        rel="noreferrer"
      >
        View file
      </a>
    )
  }

  return (
    <div
      className={clsx(
        'flex justify-between items-center text-xs leading-8 py-2 px-3 rounded-t-md font-mono default-border',
        'bg-[#f8f9fa] dark:bg-[#151718]',
        {
          'rounded-md': isDiffCollapsed,
          'rounded-t-md': !isDiffCollapsed,
          'border-b': !isDiffCollapsed,
          'border-b-0': isDiffCollapsed
        }
      )}
    >
      <button
        className={clsx('flex items-center gap-2 border-0 bg-transparent', {
          'cursor-pointer': hasDiff
        })}
        onClick={() => {
          setIsDiffCollapsed(!isDiffCollapsed)
        }}
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
