import { parseDiff } from 'react-diff-view'

import { Diff } from '../diff'
import { Container } from './styles'

interface DiffsProps {
  readonly diff: string
  readonly newVersion: string
  readonly type: string
  readonly newProfile: string
}

export function Diffs(props: DiffsProps) {
  const files = parseDiff(props.diff)

  return (
    <Container>
      {files.map(file => (
        <Diff
          key={`${file.oldPath}${file.newPath}`}
          file={file}
          newProfile={props.newProfile}
          newVersion={props.newVersion}
          type={props.type}
        />
      ))}
    </Container>
  )
}
