import { type FileData, type HunkData } from 'react-diff-view'

export function isDiffCollapsedByDefault(
  type: FileData['type'],
  hunks: HunkData[],
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
