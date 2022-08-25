import { Modal, Input, Select, Space } from 'antd'
import { useState } from 'react'
import { customComponentObj } from '../../../components'

const selectOptions = Object.entries(customComponentObj).map((item) => ({
  value: item[0],
  label: item[1].name
}))

interface Props {
  visible: boolean
  closeModal: () => void
  confirm: (nodeName: string, componentName: string, isCustom?: boolean) => void
}

const AddModal = ({ visible, closeModal, confirm }: Props) => {
  const [tag, setTag] = useState('')
  const [type, setType] = useState(1)
  const [customName, setCustomName] = useState('')

  const onOk = () => {
    const nodeName =
      type === 1
        ? tag
        : selectOptions.find((item) => item.value === customName)!.label
    const componentName = type === 1 ? tag : customName
    if (!componentName) {
      return
    }
    confirm(nodeName, componentName, type === 2)
  }

  return (
    <Modal
      visible={visible}
      onCancel={closeModal}
      onOk={onOk}
      title='Add Children'
    >
      <Space>
        <Select
          options={[
            {
              label: '原生标签',
              value: 1
            },
            {
              label: '自定义组件',
              value: 2
            }
          ]}
          value={type}
          onChange={(v) => {
            setType(v)
          }}
        />
        {type === 1 && (
          <Input
            value={tag}
            onChange={(e) => {
              setTag(e.target.value)
            }}
          />
        )}
        {type === 2 && (
          <Select
            style={{ width: 200 }}
            options={selectOptions}
            value={customName}
            onChange={(v) => {
              setCustomName(v)
            }}
          />
        )}
      </Space>
    </Modal>
  )
}

export default AddModal
