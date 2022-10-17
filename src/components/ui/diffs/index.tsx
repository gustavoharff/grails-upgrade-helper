import { useState } from 'react'
import { parseDiff } from 'react-diff-view'

import { Diff } from '../diff'
import { ViewStyleOption } from './view-style-option'

interface DiffsProps {
  readonly diff: string
  readonly newVersion: string
  readonly type: string
  readonly newProfile: string
}

export function Diffs(props: DiffsProps) {
  const files = parseDiff(props.diff)

  const [viewType, setViewType] = useState<'split' | 'unified'>('split')

  return (
    <div className="flex justify-center flex-col w-[90%] mt-8">
      <div className="flex flex-col">
        <div className="flex justify-end">
          <ViewStyleOption value={viewType} onChange={setViewType} />
        </div>

        {files.map(file => (
          <Diff
            key={`${file.oldPath}${file.newPath}`}
            file={file}
            newProfile={props.newProfile}
            newVersion={props.newVersion}
            type={props.type}
            viewType={viewType}
          />
        ))}
      </div>
    </div>
  )
}
