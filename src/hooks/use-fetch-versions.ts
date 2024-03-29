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

export function useFetchVersions() {
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

  return { versions }
}
