import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
  padding-top: 30px;
`

export const Content = styled.div`
  margin-top: 16;
  display: flex;
  width: 100%;
  justify-content: center;
`

interface PageProps {
  children: React.ReactNode
}

export function Page(props: PageProps) {
  return <Container>{props.children}</Container>
}

Page.Content = Content
