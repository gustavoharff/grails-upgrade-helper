import styled from '@emotion/styled'
import { useMemo } from 'react'
import semver from 'semver'

import { ProfileInput } from './profile-input'
import { VersionInput } from './version-input'

const Container = styled.div`
  display: flex;
  flex: 1;
  gap: 16px;
`

interface VersionSectionProps {
  versionTitle: string
  versions: string[]
  version: string
  onVersionChange: (version: string) => void
  profileTitle: string
  profile: 'web' | 'rest-api'
  onProfileChange: (profile: 'web' | 'rest-api') => void
}

export function VersionSection(props: VersionSectionProps) {
  const {
    versionTitle,
    versions,
    version,
    onVersionChange,
    profileTitle,
    profile,
    onProfileChange
  } = props

  const profileVisible = useMemo(() => {
    if (!version) return false

    return semver.gte(version, '3.0.0')
  }, [version])

  return (
    <Container>
      <VersionInput
        label={versionTitle}
        selectedVersion={version}
        versions={versions}
        onChange={onVersionChange}
      />

      <ProfileInput
        label={profileTitle}
        selectedProfile={profile}
        onChange={onProfileChange}
        visible={profileVisible}
      />
    </Container>
  )
}
