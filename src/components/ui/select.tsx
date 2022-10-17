import { Select as AntdSelect } from 'antd'

interface SelectProps<T extends string> {
  title: string
  options: T[]
  value?: T | null
  onChange: (value: T) => void
  defaultValue?: T
}

export function Select<T extends string>(props: SelectProps<T>) {
  const { title, options, value, onChange, defaultValue, ...rest } = props

  return (
    <div className="w-full">
      <h4 style={{ whiteSpace: 'nowrap' }}>{title}</h4>

      <AntdSelect
        className="w-full"
        size="large"
        {...rest}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {options?.map(option => (
          <AntdSelect.Option key={option} value={option}>
            {option}
          </AntdSelect.Option>
        ))}
      </AntdSelect>
    </div>
  )
}
