import { Input } from '@chakra-ui/react'
import useStore from '../store'

const Edit = () => {
  const { setProps, propsObj, selectedKey } = useStore()

  const handleChange = (e: any) => {
    setProps({
      text: e.target.value
    })
  }

  return (
    <div className='edit-wrap'>
      <Input
        value={propsObj[selectedKey]?.text || ''}
        onChange={handleChange}
        placeholder='filed: text'
        size='sm'
      />
    </div>
  )
}

export default Edit
