import { Button, Popover, Radio } from 'antd'
import { useState } from 'react'

interface SettingsProps {
  type: 'app' | 'plugin'
  onTypeChange: (type: 'app' | 'plugin') => void
}

export function Settings({ type, onTypeChange }: SettingsProps) {
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
        </div>
      }
    >
      <Button className="mb-4" icon={<span>⚙️</span>} />
    </Popover>
  )
}
