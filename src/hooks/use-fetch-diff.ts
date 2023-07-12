import { message } from 'antd'
import axios from 'axios'
import { useCallback, useState } from 'react'

import { DIFFS_REPO_URL } from '../constants'

interface UseFetchDiffProps {
  fromVersion?: string
  toVersion?: string

  type: string

  fromProfile: string
  toProfile: string
}

export function useFetchDiff(props: UseFetchDiffProps) {
  const { toVersion, fromVersion, type, toProfile, fromProfile } = props

  const [isFetching, setIsFetching] = useState(false)
  const [diff, setDiff] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    if (!fromVersion || !toVersion) {
      setDiff(null)
      return
    }

    setIsFetching(true)

    const from = `${fromVersion}-${fromProfile}-${type}`
    const to = `${toVersion}-${toProfile}-${type}`

    const url = `/diffs/diffs/${from}..${to}.diff`

    try {
      const response = await axios.get<string>(url, {
        baseURL: DIFFS_REPO_URL
      })

      setDiff(response.data)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        message.error('No diff found for the selected versions')
      }

      setDiff(null)
    } finally {
      setIsFetching(false)
    }
  }, [fromVersion, toVersion, fromProfile, type, toProfile])

  return { diff, isFetching, fetch }
}
