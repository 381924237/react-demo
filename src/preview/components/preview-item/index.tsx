import React from 'react'
import useStore from '../../../store'
import './index.css'

interface Props {
  isSelected?: boolean
  node: ChildrenItem
  children?: React.ReactNode
  nodeProps: any
}

const PreviewItem = ({ node, isSelected, children, nodeProps }: Props) => {
  const { setSelectedKey } = useStore()
  const { componentName, key } = node
  const { text, style = {} } = nodeProps || {}

  return React.createElement(
    componentName,
    {
      id: key,
      className: `${isSelected ? 'selected' : ''}`,
      style,
      onClick: (e: any) => {
        e.stopPropagation()
        setSelectedKey(key)
      }
    },
    text,
    children
  )
}

export default PreviewItem
