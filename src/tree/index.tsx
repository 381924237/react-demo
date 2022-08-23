import useStore from '../store'
import { Tree } from 'antd'
import { PlusSquareIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input
} from '@chakra-ui/react'
import { useState } from 'react'

const TreeWrap = () => {
  const { rootTree, setSelectedKey, selectedKey, addNode, deleteNode } =
    useStore()
  const [visible, setVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>()
  const [value, setValue] = useState('')

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

  const confirm = () => {
    addNode(currentItem.key, value)
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
                <span>{item.name}</span>
                <PlusSquareIcon
                  ml='15px'
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddClick(item)
                  }}
                />
                {item.key !== '0' && (
                  <DeleteIcon
                    ml='15px'
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
      <Modal isOpen={visible} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Children</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }}
              placeholder='filed: tag'
              size='sm'
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button onClick={confirm}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TreeWrap
