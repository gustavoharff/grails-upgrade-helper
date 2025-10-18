import { Radio } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import semver from 'semver'
import { useDarkMode } from 'usehooks-ts'

import { useFetchDiff, useFetchVersions } from '../../hooks'
import { type Profile } from '../../types'
import { getFromUrl } from '../../utils/get-from-url'
import { updateURL } from '../../utils/update-url'
import {
  Diffs,
  Header,
  Page,
  Settings,
  ShowMeButton,
  VersionSection
} from '../ui'

export function Home() {
  const [type, setType] = useState<'app' | 'plugin'>(getFromUrl<'app' | 'plugin'>('type', 'app'))
  const [showBetaReleases, setShowBetaReleases] = useState(getFromUrl('showBetaReleases', 'true') === 'true')

  const [fromVersion, setFromVersion] = useState(getFromUrl('from', ''))
  const [fromProfile, setFromProfile] = useState<Profile>(
    getFromUrl<Profile>('fromProfile', 'web')
  )

  const [toVersion, setToVersion] = useState(getFromUrl('to', ''))
  const [toProfile, setToProfile] = useState<Profile>(
    getFromUrl<Profile>('toProfile', 'web')
  )

  const { versions } = useFetchVersions({
    includeBetaReleases: showBetaReleases
  })

  useEffect(() => {
    if (!fromVersion && versions.length > 0) {
      setFromVersion(versions[1])
      setFromProfile('rest-api')
    }

    if (!toVersion && versions.length > 0) {
      setToVersion(versions[0])
      setToProfile('rest-api')
    }
  }, [fromProfile, fromVersion, toProfile, toVersion, versions])

  const { toggle, isDarkMode } = useDarkMode()

  const { diff, fetch, isFetching } = useFetchDiff({
    type,
    fromVersion,
    toVersion,
    fromProfile,
    toProfile
  })

  function onFromVersionChange(version: string) {
    if (version && semver.valid(version) && semver.lt(version, '3.0.0')) {
      setFromProfile('web')
    }

    setFromVersion(version)
  }

  function onToVersionChange(version: string) {
    if (version && semver.valid(version) && semver.lt(version, '3.0.0')) {
      setToProfile('web')
    }

    setToVersion(version)
  }

  const onSubmit = useCallback(async () => {
    if (!fromVersion || !toVersion) return

    updateURL({
      fromVersion,
      fromProfile,
      toProfile,
      toVersion,
      type
    })

    await fetch()
  }, [fetch, fromProfile, fromVersion, toProfile, toVersion, type])

  useEffect(() => {
    if (getFromUrl('from') && getFromUrl('to')) {
      fetch()
    }
  }, []) // exec only on init

  return (
    <Page>
      <Header>
        <Header.Top>
          <Radio.Group value={isDarkMode ? 'dark' : 'light'}>
            <Radio.Button
              value="light"
              onChange={() => {
                localStorage.setItem('theme', 'light')

                if (isDarkMode) {
                  toggle()
                }
              }}
            >
              🌕
            </Radio.Button>
            <Radio.Button
              value="dark"
              onChange={() => {
                localStorage.setItem('theme', 'dark')

                if (!isDarkMode) {
                  toggle()
                }
              }}
            >
              🌑
            </Radio.Button>
          </Radio.Group>
          <Settings
            showBetaReleases={showBetaReleases}
            onShowBetaReleasesChange={setShowBetaReleases}
            type={type} onTypeChange={(newType) => {
              setType(newType)

              const hasFromVersionSupportForProfiles = semver.valid(fromVersion) && semver.gte(fromVersion, '3.0.0')
              const hasToVersionSupportForProfiles = semver.valid(toVersion) && semver.gte(toVersion, '3.0.0')

              if (hasFromVersionSupportForProfiles) {
                setFromProfile('web')
              } else {
                if (newType === 'plugin') {
                  if (fromProfile === 'web') setFromProfile('web-plugin')
                  if (fromProfile === 'rest-api') setFromProfile('rest-api-plugin')
                }

                if (newType === 'app') {
                  if (fromProfile === 'web-plugin') setFromProfile('web')
                  if (fromProfile === 'rest-api-plugin') setFromProfile('rest-api')
                }
              }

              if (!hasToVersionSupportForProfiles) {
                setToProfile('web')
              } else {
                if (newType === 'plugin') {
                  if (toProfile === 'web') setToProfile('web-plugin')
                  if (toProfile === 'rest-api') setToProfile('rest-api-plugin')
                }

                if (newType === 'app') {
                  if (toProfile === 'web-plugin') setToProfile('web')
                  if (toProfile === 'rest-api-plugin') setToProfile('rest-api')
                }
              }
            }}
          />
        </Header.Top>

        <Header.Center>
          <VersionSection
            type={type}
            versionTitle="From Grails version"
            versions={versions}
            version={fromVersion}
            onVersionChange={onFromVersionChange}
            profileTitle="Application profile"
            profile={fromProfile}
            onProfileChange={setFromProfile}
          />

          <VersionSection
            type={type}
            versionTitle="To Grails version"
            versions={versions}
            version={toVersion}
            onVersionChange={onToVersionChange}
            profileTitle="Application profile"
            profile={toProfile}
            onProfileChange={setToProfile}
          />
        </Header.Center>

        <Header.Bottom>
          <ShowMeButton onClick={onSubmit} loading={isFetching} />
        </Header.Bottom>
      </Header>

      {diff && (
        <div className="flex justify-center w-full mt-4">
          <Diffs
            newProfile={toProfile}
            type={type}
            newVersion={toVersion}
            diff={diff}
          />
        </div>
      )}
    </Page>
  )
}
