import styled from '@emotion/styled'

import { Select } from './select'

const Container = styled.div`
  width: 200;
`

interface ProfileInputProps {
  readonly label: string
  readonly selectedProfile: 'web' | 'rest-api'
  readonly onChange: (value: 'web' | 'rest-api') => void
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
    <Container>
      <Select
        title={label}
        value={selectedProfile}
        onChange={onChange}
        options={['web', 'rest-api']}
        defaultValue="web"
      />
    </Container>
  )
}
