import { Card } from 'antd'

interface HeaderProps {
  children: React.ReactNode
}

function Top({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end">{children}</div>
}

function Center({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-4">{children}</div>
}

function Bottom({ children }: { children: React.ReactNode }) {
  return <div className="mt-4">{children}</div>
}

export function Header({ children }: HeaderProps) {
  return <Card className="w-[90%]">{children}</Card>
}

Header.Top = Top
Header.Center = Center
Header.Bottom = Bottom
