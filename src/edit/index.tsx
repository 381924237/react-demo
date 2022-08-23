import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import useStore from '../store'

const Edit = () => {
  const { setProps, propsObj, selectedKey } = useStore()

  const handleChange = (name: string, value: any) => {
    setProps({
      [name]: value
    })
  }

  return (
    <div className='edit-wrap'>
      <InputGroup size='sm' mb='10px'>
        <InputLeftAddon children='width' />
        <Input
          value={propsObj[selectedKey]?.width || ''}
          onChange={(e) => {
            handleChange('width', e.target.value)
          }}
        />
      </InputGroup>
      <InputGroup size='sm' mb='10px'>
        <InputLeftAddon children='height' />
        <Input
          value={propsObj[selectedKey]?.height || ''}
          onChange={(e) => {
            handleChange('height', e.target.value)
          }}
        />
      </InputGroup>
      <InputGroup size='sm' mb='10px'>
        <InputLeftAddon children='background' />
        <Input
          value={propsObj[selectedKey]?.background || ''}
          onChange={(e) => {
            handleChange('background', e.target.value)
          }}
        />
      </InputGroup>
      <InputGroup size='sm' mb='10px'>
        <InputLeftAddon children='text' />
        <Input
          value={propsObj[selectedKey]?.text || ''}
          onChange={(e) => {
            handleChange('text', e.target.value)
          }}
        />
      </InputGroup>
    </div>
  )
}

export default Edit
