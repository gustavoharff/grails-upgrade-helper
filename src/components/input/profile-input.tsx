import { Select } from '../select'

interface ProfileInputProps {
  readonly label: string
  readonly selectedProfile: string
  readonly onChange: (value: string) => void
  readonly visible?: boolean
}

export function ProfileInput({
  selectedProfile,
  label,
  onChange,
  visible = true
}: ProfileInputProps) {
  if (!visible) {
    return null
  }

  return (
    <div style={{ width: 200 }}>
      <Select
        title={label}
        value={selectedProfile}
        onChange={onChange}
        options={['web', 'rest-api']}
        defaultValue="web"
      />
    </div>
  )
}
