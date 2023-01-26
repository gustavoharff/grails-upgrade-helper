export type Profile = 'web' | 'rest-api' | 'web-plugin' | 'rest-api-plugin'

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

export interface Hunk {
  content: string
  oldStart: number
  newStart: number
  oldLines: number
  newLines: number
  changes: Change[]
}
