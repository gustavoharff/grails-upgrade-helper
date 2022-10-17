import { Fragment, useState } from 'react'
import {
  Decoration,
  Diff as RDiff,
  File,
  Hunk,
  markEdits,
  tokenize
} from 'react-diff-view'

import { DiffHeader } from './header'
import { isDiffCollapsedByDefault } from './utils'

interface DiffProps {
  readonly file: File
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

  return (
    <div className="w-full mt-4 border border-solid border-gray-200 rounded-sm">
      <DiffHeader
        newPath={file.newPath}
        oldPath={file.oldPath}
        type={file.type === 'new' ? 'add' : file.type}
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
                    <div className="bg-blue-50 ml-8 pl-1 text-gray-800 text-opacity-70">
                      {hunk.content}
                    </div>
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
