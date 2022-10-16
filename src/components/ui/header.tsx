import styled from '@emotion/styled'
import { Card } from 'antd'

interface HeaderProps {
  children: React.ReactNode
}

const Container = styled(Card)`
  width: 90%;
  border-radius: 3px;
  border-color: #e8e8e8;
`

const Top = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Center = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const Bottom = styled.div`
  margin-top: 16px;
`

export function Header({ children }: HeaderProps) {
  return <Container>{children}</Container>
}

Header.Top = Top
Header.Center = Center
Header.Bottom = Bottom
