import FormItem from '../form/form-item'

const Edit = () => {
  return (
    <div className='edit-wrap'>
      <FormItem name='width' field={{ type: 'Input' }} />
      <FormItem name='height' field={{ type: 'Input' }} />
      <FormItem name='background' field={{ type: 'Input' }} />
      <FormItem name='text' field={{ type: 'Input' }} />
    </div>
  )
}

export default Edit
