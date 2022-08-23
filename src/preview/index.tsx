import PreviewItem from './components/preview-item'
import useStore from '../store'
import { Button, Textarea } from '@chakra-ui/react'
import { useState, useMemo } from 'react'
import { Modal } from '../chakra'
import { getCode, attachPropsToNode } from '../utils'

const renderItem = (
  tree: ChildrenItem[],
  selectedKey: string,
  propsObj: { [key: string]: any }
) => {
  return tree.map((item) => (
    <PreviewItem
      isSelected={item.key === selectedKey}
      node={item}
      key={item.key}
      nodeProps={propsObj[item.key]}
    >
      {renderItem(item.children, selectedKey, propsObj)}
    </PreviewItem>
  ))
}

const Preview = () => {
  const { rootTree, selectedKey, propsObj } = useStore()
  const [visible, setVisible] = useState(false)
  const [modalType, setModalType] = useState(1)

  const closeModal = () => {
    setVisible(false)
  }

  const { schema, code } = useMemo(() => {
    const tree = attachPropsToNode(rootTree, propsObj)
    return {
      schema: JSON.stringify(tree, null, 2),
      code: getCode(tree)
    }
  }, [rootTree, propsObj])

  return (
    <>
      <div className='preview-wrap'>
        <div className='schema-code'>
          <Button
            onClick={() => {
              setVisible(true)
              setModalType(1)
            }}
          >
            Schema
          </Button>
          <Button
            ml='3'
            onClick={() => {
              setVisible(true)
              setModalType(2)
            }}
          >
            Code
          </Button>
        </div>
        <div className='preview'>
          {renderItem(rootTree, selectedKey, propsObj)}
        </div>
      </div>
      <Modal
        visible={visible}
        onClose={closeModal}
        confirm={closeModal}
        title={modalType === 2 ? 'Code' : 'Schema'}
      >
        <Textarea defaultValue={modalType === 2 ? code : schema} rows={20} />
      </Modal>
    </>
  )
}

export default Preview
