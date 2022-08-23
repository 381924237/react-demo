import { Input } from '@chakra-ui/react'
import useStore from '../store'
import { useState, useMemo } from 'react'

const Edit = () => {
  const { setProps, propsMap, selectedKey } = useStore()

  const handleChange = (e: any) => {
    setProps({
      text: e.target.value
    })
  }

  return (
    <div className='edit-wrap'>
      <Input
        value={propsMap.get(selectedKey)?.text || ''}
        onChange={handleChange}
        placeholder='filed: text'
        size='sm'
      />
    </div>
  )
}

export default Edit
