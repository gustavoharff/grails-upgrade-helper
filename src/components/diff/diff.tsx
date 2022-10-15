import { Fragment, useState } from 'react'
import {
  Decoration,
  Diff as RDiff,
  File,
  Hunk,
  HunkType,
  markEdits,
  parseDiff,
  tokenize
} from 'react-diff-view'

import styles from './diff.module.css'
import { DiffHeader } from './header'

interface DiffsProps {
  readonly diff: string
  readonly newVersion: string
  readonly newType: string
  readonly newProfile: string
}

function isDiffCollapsedByDefault(
  type: File['type'],
  hunks: HunkType[],
  newPath?: string
) {
  if (
    newPath?.endsWith('bundle.js') ||
    newPath?.endsWith('.min.js') ||
    newPath?.endsWith('.map') ||
    newPath?.endsWith('.js.map') ||
    newPath?.endsWith('bootstrap.css') ||
    newPath?.endsWith('bootstrap.js') ||
    newPath?.endsWith('.min.css')
  ) {
    return true
  }

  if (type === 'delete') return true

  if (hunks.length > 5) return true

  return false
}

export function Diffs(props: DiffsProps) {
  const files = parseDiff(props.diff)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {files.map(file => (
        <Diff
          key={`${file.oldPath}${file.newPath}`}
          file={file}
          newProfile={props.newProfile}
          newVersion={props.newVersion}
          newType={props.newType}
        />
      ))}
    </div>
  )
}

interface DiffProps {
  readonly file: File
  readonly newProfile: string
  readonly newVersion: string
  readonly newType: string
}

function Diff({ file, newProfile, newVersion, newType }: DiffProps) {
  const [isDiffCollapsed, setIsDiffCollapsed] = useState(
    isDiffCollapsedByDefault(file.type, file.hunks, file.newPath)
  )

  return (
    <div className={styles.diffContainer}>
      <DiffHeader
        newPath={file.newPath}
        oldPath={file.oldPath}
        type={file.type === 'new' ? 'add' : file.type}
        newProfile={newProfile}
        newVersion={newVersion}
        newType={newType}
        hasDiff={file.hunks.length > 0}
        isDiffCollapsed={isDiffCollapsed}
        setIsDiffCollapsed={setIsDiffCollapsed}
      />

      {!isDiffCollapsed && (
        <div>
          <RDiff
            viewType="split"
            diffType={file.type === 'new' ? 'add' : file.type}
            hunks={file.hunks}
            optimizeSelection={true}
          >
            {hunks => {
              const options = {
                enhancers: [markEdits(hunks)]
              }

              const tokens = tokenize(hunks, options)

              return hunks.map(hunk => (
                <Fragment key={`decoration-${hunk.content}`}>
                  <Decoration>
                    <div className={styles.hunkContent}>{hunk.content}</div>
                  </Decoration>

                  <Hunk key={hunk.content} hunk={hunk} tokens={tokens} />
                </Fragment>
              ))
            }}
          </RDiff>
        </div>
      )}
    </div>
  )
}
