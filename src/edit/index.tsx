import FormItem from '../form/form-item'

const Edit = () => {
  return (
    <div className='edit-wrap'>
      <FormItem
        label='width'
        name={['style', 'width']}
        field={{ type: 'InputNumber' }}
      />
      <FormItem
        label='height'
        name={['style', 'height']}
        field={{ type: 'InputNumber' }}
      />
      <FormItem
        label='background'
        name={['style', 'background']}
        field={{ type: 'Input' }}
      />
      <FormItem label='text' name='text' field={{ type: 'Input' }} />
    </div>
  )
}

export default Edit
