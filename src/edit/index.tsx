import FormItem from '../form/form-item'
import useStore from '../store'

const Edit = () => {
  const { propsObj } = useStore()
  return (
    <div className='edit-wrap'>
      <FormItem name='width' field={{ type: 'Input' }} />
      <FormItem name='height' field={{ type: 'Input' }} />
      <FormItem name='background' field={{ type: 'Input' }} />
      <FormItem name='text' field={{ type: 'Input' }} />
      <FormItem
        name='test'
        field={{
          type: 'Select',
          options: [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 }
          ]
        }}
      />
      <div>{JSON.stringify(propsObj, null, 2)}</div>
    </div>
  )
}

export default Edit
