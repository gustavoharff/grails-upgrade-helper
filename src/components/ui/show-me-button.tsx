import styled from '@emotion/styled'
import { Button as AntButton } from 'antd'

interface ShowMeButtonProps {
  onClick: () => void
  loading?: boolean
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  overflow: hidden;
`

const Button = styled(AntButton)`
  border-radius: 3px;
`

export function ShowMeButton({ onClick, loading }: ShowMeButtonProps) {
  return (
    <Container>
      <Button loading={loading} onClick={onClick} type="primary" size="large">
        Show me
      </Button>
    </Container>
  )
}
