import { DownOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'

interface IconProps {
  readonly isDiffCollapsed: boolean
}

export const Icon = styled(DownOutlined)<IconProps>`
  width: 10px;
  color: #24292e;
  transform: ${({ isDiffCollapsed }) =>
    isDiffCollapsed ? 'rotate(-90deg)' : 'initial'};
  transition: transform 0.2s ease-in-out;
  transform-origin: center;
`
