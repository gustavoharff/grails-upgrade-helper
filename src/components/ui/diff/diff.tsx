import clsx from 'clsx'
import { Fragment, useState } from 'react'
import {
  type FileData,
  Decoration,
  Diff as RDiff,
  Hunk,
  markEdits,
  tokenize
} from 'react-diff-view'

import { DiffHeader } from './header'
import { isDiffCollapsedByDefault } from './utils'

interface DiffProps {
  readonly file: FileData
  readonly viewType: 'split' | 'unified'
  readonly newProfile: string
  readonly newVersion: string
  readonly type: string
}

export function Diff(props: DiffProps) {
  const { file, newProfile, newVersion, type, viewType } = props

  const [isDiffCollapsed, setIsDiffCollapsed] = useState(
    isDiffCollapsedByDefault(file.type, file.hunks, file.newPath)
  )

  const tokens = tokenize(file.hunks, {
    enhancers: [markEdits(file.hunks)]
  })

  return (
    <div
      className={clsx(
        'w-full mt-4 border border-gray-200 rounded-md default-border'
      )}
    >
      <DiffHeader
        newPath={file.newPath}
        oldPath={file.oldPath}
        type={file.type}
        newProfile={newProfile}
        newVersion={newVersion}
        applicationType={type}
        hasDiff={file.hunks.length > 0}
        isDiffCollapsed={isDiffCollapsed}
        setIsDiffCollapsed={setIsDiffCollapsed}
      />

      {!isDiffCollapsed && (
        <div>
          <RDiff
            viewType={viewType}
            diffType={file.type}
            hunks={file.hunks}
            optimizeSelection={true}
            tokens={tokens}
          >
            {hunks => {
              return hunks.map(hunk => (
                <Fragment key={`decoration-${hunk.content}`}>
                  <Decoration>
                    <div className="ml-8 pl-1">{hunk.content}</div>
                  </Decoration>

                  <Hunk key={hunk.content} hunk={hunk} />
                </Fragment>
              ))
            }}
          </RDiff>
        </div>
      )}
    </div>
  )
}
