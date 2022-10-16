import { useState } from 'react'
import { parseDiff } from 'react-diff-view'

import { Diff } from '../diff'
import { Container, Content, Controls } from './styles'
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
    <Container>
      <Content>
        <Controls>
          <ViewStyleOption value={viewType} onChange={setViewType} />
        </Controls>

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
      </Content>
    </Container>
  )
}
