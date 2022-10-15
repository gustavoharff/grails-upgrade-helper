import styled from '@emotion/styled'
import { Button, Popover, Radio } from 'antd'
import { useState } from 'react'

const SettingsButton = styled(Button)`
  color: initial;
  margin-bottom: 16px;
`

const TypeGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

interface SettingsProps {
  type: string
  onTypeChange: (type: string) => void
}

export function Settings({ type, onTypeChange }: SettingsProps) {
  const [popoverVisibility, setVisibility] = useState(false)

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      visible={popoverVisibility}
      onVisibleChange={setVisibility}
      content={
        <TypeGroupContainer>
          <h5>Change application type</h5>
          <Radio.Group
            size="small"
            value={type}
            onChange={e => {
              onTypeChange(e.target.value)
            }}
          >
            <TypeGroupContainer>
              <Radio value="app">app</Radio>
              <Radio value="plugin">plugin</Radio>
            </TypeGroupContainer>
          </Radio.Group>
        </TypeGroupContainer>
      }
    >
      <SettingsButton icon={<span>⚙️</span>} />
    </Popover>
  )
}
