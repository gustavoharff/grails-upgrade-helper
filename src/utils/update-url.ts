import { Profile } from '../types'

interface UpdateUrl {
  fromVersion: string
  toVersion: string
  fromProfile: Profile
  toProfile: Profile
  type: 'app' | 'plugin'
}

export function updateURL({
  fromVersion,
  toVersion,
  fromProfile,
  toProfile,
  type
}: UpdateUrl) {
  const pageURL = window.location.href.replace(window.location.search, '')

  const newURL =
    fromVersion !== '' || toVersion !== ''
      ? `?from=${fromVersion}&to=${toVersion}`
      : '?'
  const fromProfileInURL = fromProfile ? `&fromProfile=${fromProfile}` : ''
  const toProfileInURL = toProfile ? `&toProfile=${toProfile}` : ''
  const typeInURL = type ? `&type=${type}` : ''

  window.history.replaceState(
    null,
    // @ts-expect-error
    null,
    `${pageURL}${newURL}${fromProfileInURL}${toProfileInURL}${typeInURL}`
  )
}
