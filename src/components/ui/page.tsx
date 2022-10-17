interface PageProps {
  children: React.ReactNode
}

export function Page(props: PageProps) {
  return (
    <div className="flex items-center justify-center flex-col p-4 pt-8">
      {props.children}
    </div>
  )
}
