import axios from 'axios'
import { useEffect, useState } from 'react'

import { DIFFS_REPO_URL } from '../constants'

function cleanVersions(data: string) {
  const versions = data.split('\n')

  const withoutTypeAndProfile = versions
    .filter(v => v)
    .map(v => v.replace(/(-web|-rest-api|-plugin|-app)/g, ''))

  return Array.from(new Set(withoutTypeAndProfile))
}

interface UseFetchVersionsParams {
  includeBetaReleases: boolean
}

export function useFetchVersions(param: UseFetchVersionsParams) {
  const { includeBetaReleases } = param

  const [versions, setVersions] = useState<string[]>([])

  async function fetch() {
    const url = '/main/RELEASES'

    const response = await axios.get<string>(url, {
      baseURL: DIFFS_REPO_URL
    })

    setVersions(cleanVersions(response.data))
  }

  useEffect(() => {
    fetch()
  }, [])

  // only versions that match 0.0.0 regex
  const stableVersions = versions.filter(v => /^\d+\.\d+\.\d+$/.test(v))

  if (!includeBetaReleases) {
    return { versions: stableVersions }
  }

  return { versions }
}
