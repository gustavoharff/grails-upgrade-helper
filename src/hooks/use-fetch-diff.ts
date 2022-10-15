import axios from 'axios'
import { useCallback, useState } from 'react'

import { DIFFS_REPO_URL } from '../constants'

interface UseFetchDiffProps {
  fromVersion?: string
  toVersion?: string

  fromType: string
  toType: string

  fromProfile: string
  toProfile: string
}

export function useFetchDiff(props: UseFetchDiffProps) {
  const { toVersion, fromVersion, toType, fromType, toProfile, fromProfile } =
    props

  const [isFetching, setIsFetching] = useState(false)
  const [diff, setDiff] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    if (!fromVersion || !toVersion) {
      setDiff(null)
      return
    }

    setIsFetching(true)

    const from = `${fromVersion}-${fromProfile}-${fromType}`
    const to = `${toVersion}-${toProfile}-${toType}`

    const url = `/diffs/diffs/${from}..${to}.diff`

    try {
      const response = await axios.get<string>(url, {
        baseURL: DIFFS_REPO_URL
      })

      setDiff(response.data)
    } catch {
      setDiff(null)
    } finally {
      setIsFetching(false)
    }
  }, [fromVersion, toVersion, fromProfile, fromType, toProfile, toType])

  return { diff, isFetching, fetch }
}
