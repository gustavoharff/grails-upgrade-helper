import { Radio } from 'antd'

interface ViewStyleOptionProps {
  className?: string
  value: 'split' | 'unified'
  onChange: (value: 'split' | 'unified') => void
}

export function ViewStyleOption(props: ViewStyleOptionProps) {
  const { className, value, onChange } = props

  return (
    <Radio.Group className={className} value={value}>
      <Radio.Button value="split" onChange={() => onChange('split')}>
        Split
      </Radio.Button>
      <Radio.Button value="unified" onChange={() => onChange('unified')}>
        Unified
      </Radio.Button>
    </Radio.Group>
  )
}
