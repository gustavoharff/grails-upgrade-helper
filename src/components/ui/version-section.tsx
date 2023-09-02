import { useMemo } from 'react'
import semver from 'semver'

import { type Profile } from '../../types'
import { ProfileInput } from './profile-input'
import { VersionInput } from './version-input'

interface VersionSectionProps {
  type: 'app' | 'plugin'
  versionTitle: string
  versions: string[]
  version: string
  onVersionChange: (version: string) => void
  profileTitle: string
  profile: Profile
  onProfileChange: (profile: Profile) => void
}

export function VersionSection(props: VersionSectionProps) {
  const {
    type,
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

    if (semver.valid(version) && semver.lt(version, '3.0.0')) return false

    return semver.gte(version, '3.0.0')
  }, [version])

  return (
    <div className="flex flex-1 gap-4">
      <VersionInput
        label={versionTitle}
        selectedVersion={version}
        versions={versions}
        onChange={onVersionChange}
      />

      <ProfileInput
        type={type}
        label={profileTitle}
        selectedProfile={profile}
        onChange={onProfileChange}
        visible={profileVisible}
      />
    </div>
  )
}
