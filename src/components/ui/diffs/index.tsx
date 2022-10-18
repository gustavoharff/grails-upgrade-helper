import { Pagination } from 'antd'
import { useState } from 'react'
import { parseDiff } from 'react-diff-view'

import { Diff } from '../diff'
import { ViewStyleOption } from './view-style-option'

interface DiffsProps {
  readonly diff: string
  readonly newVersion: string
  readonly type: string
  readonly newProfile: string
}

export function Diffs(props: DiffsProps) {
  const files = parseDiff(props.diff)

  const [viewType, setViewType] = useState<'split' | 'unified'>('split')

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const offset = pageSize * (page - 1)

  const paginatedItems = files.slice(offset, pageSize * page)

  return (
    <div className="flex justify-center flex-col w-[90%] mt-8">
      <div className="flex flex-col">
        <div className="flex gap-4">
          <Pagination
            current={page}
            onChange={(page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
            }}
            total={files.length}
            pageSize={pageSize}
            hideOnSinglePage
          />

          <ViewStyleOption
            className="!ml-auto"
            value={viewType}
            onChange={setViewType}
          />
        </div>

        {paginatedItems.map(file => (
          <Diff
            key={`${file.oldPath}${file.newPath}`}
            file={file}
            newProfile={props.newProfile}
            newVersion={props.newVersion}
            type={props.type}
            viewType={viewType}
          />
        ))}

        <div className="flex justify-center mt-8">
          <Pagination
            current={page}
            onChange={(page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
            }}
            total={files.length}
            pageSize={pageSize}
            hideOnSinglePage
          />
        </div>
      </div>
    </div>
  )
}
