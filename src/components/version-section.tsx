import styled from '@emotion/styled'
import { useMemo } from 'react'
import semver from 'semver'
import { ProfileInput, VersionInput } from './input'

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
  profile: string
  onProfileChange: (profile: string) => void
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
