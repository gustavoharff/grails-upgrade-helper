import { type File, type HunkType } from 'react-diff-view'

export function isDiffCollapsedByDefault(
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
