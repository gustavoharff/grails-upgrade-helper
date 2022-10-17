import { Button } from 'antd'

interface ShowMeButtonProps {
  onClick: () => void
  loading?: boolean
}

export function ShowMeButton({ onClick, loading }: ShowMeButtonProps) {
  return (
    <div className="flex justify-center h-auto overflow-hidden">
      <Button loading={loading} onClick={onClick} type="primary" size="large">
        Show me
      </Button>
    </div>
  )
}
