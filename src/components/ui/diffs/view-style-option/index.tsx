import { Radio } from 'antd'

interface ViewStyleOptionProps {
  value: 'split' | 'unified'
  onChange: (value: 'split' | 'unified') => void
}

export function ViewStyleOption(props: ViewStyleOptionProps) {
  const { value, onChange } = props

  return (
    <Radio.Group value={value}>
      <Radio.Button value="split" onChange={() => onChange('split')}>
        Split
      </Radio.Button>
      <Radio.Button value="unified" onChange={() => onChange('unified')}>
        Unified
      </Radio.Button>
    </Radio.Group>
  )
}
