import { Select } from './select'

interface ProfileInputProps {
  readonly label: string
  readonly selectedProfile: 'web' | 'rest-api'
  readonly onChange: (value: 'web' | 'rest-api') => void
  readonly visible?: boolean
}

export function ProfileInput(props: ProfileInputProps) {
  const { selectedProfile, label, onChange, visible = true } = props

  if (!visible) {
    return null
  }

  return (
    <div className="w-48">
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
