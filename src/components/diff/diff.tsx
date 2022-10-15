import { Fragment, useState } from 'react'
import {
  parseDiff,
  Diff as RDiff,
  Hunk,
  Decoration,
  markEdits,
  tokenize
  // @ts-expect-error
} from 'react-diff-view'
import { DiffHeader } from './header'

import styles from './diff.module.css'
import { FileDiffType } from '../../types'

interface DiffsProps {
  readonly diff: string
  readonly newVersion: string
  readonly newType: string
  readonly newProfile: string
}

function isDiffCollapsedByDefault(
  type: FileDiffType,
  hunks: any,
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

  return files.map((file: any) => (
    <Diff
      key={`${file.oldPath as string}${file.newPath as string}`}
      file={file}
      newProfile={props.newProfile}
      newVersion={props.newVersion}
      newType={props.newType}
    />
  ))
}

interface DiffProps {
  readonly file: any
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
            {(hunks: any) => {
              const options = {
                enhancers: [markEdits(hunks)]
              }

              const tokens = tokenize(hunks, options)

              return hunks.map((hunk: any) => (
                <Fragment key={`decoration-${hunk.conten as string}`}>
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
