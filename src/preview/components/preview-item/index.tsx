import React from 'react'
import useStore from '../../../store'
import { customComponentObj } from '../../../components'
import './index.css'

interface Props {
  isSelected?: boolean
  node: ChildrenItem
  children?: React.ReactNode
  nodeProps: any
}

const PreviewItem = ({ node, isSelected, children, nodeProps = {} }: Props) => {
  const { setSelectedKey } = useStore()
  const { isCustom, componentName, key } = node
  const { text, style = {} } = nodeProps

  const onClick = (e: any) => {
    e.stopPropagation()
    setSelectedKey(key)
  }

  const CustomComponent = customComponentObj[componentName]?.component

  return !isCustom ? (
    React.createElement(
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
  ) : CustomComponent ? (
    <div
      className={`custom-preview-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <CustomComponent {...nodeProps} />
    </div>
  ) : null
}

export default PreviewItem
