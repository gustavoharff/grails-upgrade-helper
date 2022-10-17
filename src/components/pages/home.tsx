import { Radio } from 'antd'
import { useState } from 'react'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import semver from 'semver'

import { useFetchDiff, useFetchVersions } from '../../hooks'
import {
  Diffs,
  Header,
  Page,
  Settings,
  ShowMeButton,
  VersionSection
} from '../ui'

export function Home() {
  const [type, setType] = useState<'app' | 'plugin'>('app')

  const [fromVersion, setFromVersion] = useState('')
  const [fromProfile, setFromProfile] = useState<'web' | 'rest-api'>('web')

  const [toVersion, setToVersion] = useState('')
  const [toProfile, setToProfile] = useState<'web' | 'rest-api'>('web')

  const { versions } = useFetchVersions()

  const { switcher, currentTheme } = useThemeSwitcher()

  const { diff, fetch, isFetching } = useFetchDiff({
    type,
    fromVersion,
    toVersion,
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
        <Header.Top>
          <Radio.Group value={currentTheme}>
            <Radio.Button
              value="light"
              onChange={() => {
                localStorage.setItem('theme', 'light')
                switcher({ theme: 'light' })
              }}
            >
              🌕
            </Radio.Button>
            <Radio.Button
              value="dark"
              onChange={() => {
                localStorage.setItem('theme', 'dark')
                switcher({ theme: 'dark' })
              }}
            >
              🌑
            </Radio.Button>
          </Radio.Group>
          <Settings type={type} onTypeChange={setType} />
        </Header.Top>

        <Header.Center>
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
        </Header.Center>

        <Header.Bottom>
          <ShowMeButton onClick={fetch} loading={isFetching} />
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
