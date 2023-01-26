import { useMemo } from 'react'

import { Profile } from '../../types'
import { Select } from './select'

interface ProfileInputProps {
  readonly label: string
  readonly type: 'app' | 'plugin'
  readonly selectedProfile: Profile
  readonly onChange: (value: Profile) => void
  readonly visible?: boolean
}

export function ProfileInput(props: ProfileInputProps) {
  const { selectedProfile, type, label, onChange, visible = true } = props

  const options = useMemo<Profile[]>(() => {
    if (type === 'app') {
      return ['web', 'rest-api']
    }

    return ['web-plugin', 'rest-api-plugin']
  }, [type])

  if (!visible) {
    return null
  }

  return (
    <div className="w-48">
      <Select
        title={label}
        value={selectedProfile}
        onChange={onChange}
        options={options}
        defaultValue="web"
      />
    </div>
  )
}
