import { Button, Checkbox, Divider, Popover, Radio } from 'antd'
import { useState } from 'react'

interface SettingsProps {
  type: 'app' | 'plugin'
  onTypeChange: (type: 'app' | 'plugin') => void

  showBetaReleases: boolean
  onShowBetaReleasesChange: (show: boolean) => void
}

export function Settings({ type, onTypeChange, showBetaReleases, onShowBetaReleasesChange }: SettingsProps) {
  const [popoverVisibility, setVisibility] = useState(false)

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      open={popoverVisibility}
      onOpenChange={setVisibility}
      content={
        <div className="flex flex-col items-start">
          <h4>Change application type</h4>
          <Radio.Group
            size="small"
            value={type}
            onChange={e => {
              onTypeChange(e.target.value)
            }}
          >
            <div className="flex flex-col items-start">
              <Radio value="app">app</Radio>
              <Radio value="plugin">plugin</Radio>
            </div>
          </Radio.Group>

          <Divider className="my-2" />

          <Checkbox
            checked={showBetaReleases}
            onChange={e => {
              onShowBetaReleasesChange(e.target.checked)
            }}
          >
            Show release betas/candidates
          </Checkbox>
        </div>
      }
    >
      <Button className="mb-4" icon={<span>⚙️</span>} />
    </Popover>
  )
}
