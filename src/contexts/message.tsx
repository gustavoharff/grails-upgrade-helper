import { type MessageInstance } from 'antd/es/message/interface'
import useAntdMessage from 'antd/es/message/useMessage'
import {
  type JSXElementConstructor,
  type PropsWithChildren,
  type ReactElement,
  createContext,
  useContext
} from 'react'

interface MessageContextData {
  message: MessageInstance
  messageContextHolder: ReactElement<any, string | JSXElementConstructor<any>>
}

const MessageContext = createContext<MessageContextData>(
  // eslint-disable-next-line
  {} as MessageContextData
)

export function MessageProvider(props: PropsWithChildren) {
  const [message, messageContextHolder] = useAntdMessage()

  return (
    <MessageContext.Provider value={{ message, messageContextHolder }}>
      {messageContextHolder}
      {props.children}
    </MessageContext.Provider>
  )
}

export function useMessage() {
  return useContext(MessageContext)
}
