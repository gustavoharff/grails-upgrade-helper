import { Select } from '../select'

interface VersionInputProps {
  readonly label: string
  readonly versions: string[]
  readonly selectedVersion: string | null
  readonly onChange: (value: string) => void
}

export function VersionInput({
  selectedVersion,
  versions,
  label,
  onChange
}: VersionInputProps) {
  return (
    <Select
      title={label}
      value={selectedVersion ?? undefined}
      onChange={onChange}
      options={Array.from(versions)}
    />
  )
}
