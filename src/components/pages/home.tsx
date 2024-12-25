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

  const [fromVersion, setFromVersion] = useState(getFromUrl('from', ''))
  const [fromProfile, setFromProfile] = useState<Profile>(
    getFromUrl<Profile>('fromProfile', 'web')
  )

  const [toVersion, setToVersion] = useState(getFromUrl('to', ''))
  const [toProfile, setToProfile] = useState<Profile>(
    getFromUrl<Profile>('toProfile', 'web')
  )

  const { versions } = useFetchVersions()

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
          <Settings type={type} onTypeChange={setType} />
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
