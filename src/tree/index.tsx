import useStore from '../store'
import { Tree } from 'antd'
import { PlusCircleTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { useState } from 'react'
import AddModal from './components/add-modal'

const TreeWrap = () => {
  const { rootTree, setSelectedKey, selectedKey, addNode, deleteNode } =
    useStore()
  const [visible, setVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>()

  const onSelect = (key: string) => {
    setSelectedKey(key)
  }

  const onAddClick = (item: any) => {
    setCurrentItem(item)
    setVisible(true)
  }

  const onDeleteClick = (item: any) => {
    deleteNode(item.key)
  }

  const closeModal = () => {
    setVisible(false)
  }

  const confirm = (
    nodeName: string,
    componentName: string,
    isCustom?: boolean
  ) => {
    addNode({
      key: currentItem.key,
      nodeName,
      componentName,
      isCustom
    })
    closeModal()
  }

  return (
    <>
      <div className='tree-wrap'>
        <Tree<ChildrenItem>
          blockNode
          showLine
          defaultExpandAll
          treeData={rootTree}
          selectedKeys={[selectedKey]}
          onSelect={(selectedKeys) => {
            onSelect(selectedKeys[0] as string)
          }}
          titleRender={(item) => {
            return (
              <div className='tree-item'>
                <span>{item.nodeName}</span>
                <PlusCircleTwoTone
                  style={{ marginLeft: 15 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddClick(item)
                  }}
                />
                {item.key !== '0' && (
                  <DeleteTwoTone
                    style={{ marginLeft: 15 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteClick(item)
                    }}
                  />
                )}
              </div>
            )
          }}
        />
      </div>
      <AddModal visible={visible} closeModal={closeModal} confirm={confirm} />
    </>
  )
}

export default TreeWrap
