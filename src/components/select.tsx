import styled from '@emotion/styled'
import { Select as AntdSelect } from 'antd'

const Container = styled.div`
  width: 100%;
`
const SelectBox = styled(AntdSelect)`
  width: 100%;
`

interface SelectProps {
  title: string
  options: string[]
  value?: string | null
  onChange: (value: string) => void
  defaultValue?: string
}

export function Select({
  title,
  options,
  value,
  onChange,
  defaultValue,
  ...props
}: SelectProps) {
  return (
    <Container>
      <h4 style={{ whiteSpace: 'nowrap' }}>{title}</h4>

      <SelectBox
        size="large"
        {...props}
        value={value}
        // @ts-expect-error
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {options?.map(option => (
          <AntdSelect.Option key={option} value={option}>
            {option}
          </AntdSelect.Option>
        ))}
      </SelectBox>
    </Container>
  )
}
