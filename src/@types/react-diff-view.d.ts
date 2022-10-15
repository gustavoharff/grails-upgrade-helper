declare module 'react-diff-view' {
  export interface Change {
    content: string
    type: 'insert' | 'delete' | 'normal'
    isInsert?: boolean
    isDelete?: boolean
    isNormal?: boolean
    lineNumber?: number
    oldLineNumber?: number
    newLineNumber?: number
  }

  export interface HunkType {
    content: string
    oldStart: number
    newStart: number
    oldLines: number
    newLines: number
    changes: Change[]
  }

  export interface File {
    hunks: Hunk[]
    oldEndingNewLine: boolean
    newEndingNewLine: boolean
    oldMode: string
    newMode: string
    similarity?: number
    oldRevision: string
    newRevision: string
    oldPath: string
    newPath: string
    isBinary?: boolean
    type: 'new' | 'add' | 'delete' | 'deleted' | 'modify' | 'rename'
  }

  export function parseDiff(diff: string): File[]

  export function markEdits(hunks: HunkType[])

  export function tokenize(hunks: HunkType[], options?: object)

  interface DiffProps {
    children: (hunks: HunkType[]) => JSX.Element[]
    viewType: 'split' | 'unified'
    diffType: File['type']
    hunks: HunkType[]
    optimizeSelection: boolean
  }

  export function Diff(props: DiffProps): JSX.Element

  interface DecorationProps {
    children: React.ReactNode
  }

  export function Decoration(props: DecorationProps): JSX.Element

  interface HunkProps {
    hunk: HunkType
    tokens?: any
  }

  export function Hunk(props: HunkProps): JSX.Element
}
