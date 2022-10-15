import { useState } from 'react'
import semver from 'semver'

import { ShowMeButton } from './components/button'
import { Diffs } from './components/diff'
import { Header } from './components/header'
import { Page } from './components/page'
import { Settings } from './components/settings'
import { VersionSection } from './components/version-section'
import { useFetchDiff } from './hooks/use-fetch-diff'
import { useFetchVersions } from './hooks/use-fetch-versions'

export function App() {
  const [fromVersion, setFromVersion] = useState('')
  const [type, setType] = useState('app')
  const [fromProfile, setFromProfile] = useState('web')

  const [toVersion, setToVersion] = useState('')
  const [toProfile, setToProfile] = useState('web')

  const { versions } = useFetchVersions()

  const { diff, fetch, isFetching } = useFetchDiff({
    fromVersion,
    toVersion,
    fromType: type,
    toType: type,
    fromProfile,
    toProfile
  })

  function onFromVersionChange(version: string) {
    if (version && semver.lt(version, '3.0.0')) {
      setFromProfile('web')
    }

    setFromVersion(version)
  }

  function onToVersionChange(version: string) {
    if (version && semver.lt(version, '3.0.0')) {
      setToProfile('web')
    }

    setToVersion(version)
  }

  return (
    <Page>
      <Header>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Settings type={type} onTypeChange={setType} />
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16
          }}
        >
          <VersionSection
            versionTitle="From Grails version"
            versions={versions}
            version={fromVersion}
            onVersionChange={onFromVersionChange}
            profileTitle="Application profile"
            profile={fromProfile}
            onProfileChange={setFromProfile}
          />

          <VersionSection
            versionTitle="To Grails version"
            versions={versions}
            version={toVersion}
            onVersionChange={onToVersionChange}
            profileTitle="Application profile"
            profile={toProfile}
            onProfileChange={setToProfile}
          />
        </div>

        <ShowMeButton onClick={fetch} loading={isFetching} />
      </Header>

      <div style={{ marginTop: 16, display: 'flex', width: '100%' }}>
        {diff && (
          <Diffs
            newProfile={toProfile}
            newType={type}
            newVersion={toVersion}
            diff={diff}
          />
        )}
      </div>
    </Page>
  )
}
