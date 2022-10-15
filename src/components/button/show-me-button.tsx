import { Button } from 'antd'

interface ShowMeButtonProps {
  onClick: () => void
  loading?: boolean
}
export function ShowMeButton({ onClick, loading }: ShowMeButtonProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: 'auto',
        overflow: 'hidden',
        marginTop: 25
      }}
    >
      <Button
        loading={loading}
        onClick={onClick}
        type="primary"
        size="large"
        style={{
          borderRadius: 3
        }}
      >
        Show me
      </Button>
    </div>
  )
}
