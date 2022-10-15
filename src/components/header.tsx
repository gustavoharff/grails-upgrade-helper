import styled from '@emotion/styled'
import { Card } from 'antd'

interface HeaderProps {
  children: React.ReactNode
}

const Container = styled(Card)`
  border-radius: 3px;
  border-color: #e8e8e8;
`

export function Header({ children }: HeaderProps) {
  return (
    <Container>
      {children}
    </Container>
  )
}
