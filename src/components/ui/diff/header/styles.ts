import { RightOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier,
    monospace;
  font-size: 12px;
  color: rgb(36, 41, 46);
  line-height: 32px;

  padding: 5px 10px;
  background-color: rgb(250, 251, 252);
  border-bottom: 1px solid rgb(225, 228, 232);
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  position: sticky;
  top: 0;
`

export const CollapsableClickArea = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`

export const FileRenameArrow = styled(RightOutlined)`
  font-size: 10px;
  margin: 0 5px;
  color: #1890ff;
`
