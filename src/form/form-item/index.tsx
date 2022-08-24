import useStore from '../../store'
import { Input, Select } from 'antd'

interface Props {
  name: string
  field: InputProps | SelectProps
}

type InputProps = {
  type: 'Input'
}

type SelectProps = {
  type: 'Select'
  options: { label: string; value: any }[]
}

const FormItem = ({ name, field }: Props) => {
  const { setProps, propsObj, selectedKey } = useStore()

  const onValueChange = (v: any) => {
    setProps(name, v)
  }
  return (
    <>
      {field.type === 'Input' && (
        <Input
          value={propsObj[selectedKey]?.[name]}
          placeholder={name}
          onChange={(e) => {
            onValueChange(e.target.value)
          }}
        />
      )}
      {field.type === 'Select' && (
        <Select
          style={{ width: 150 }}
          value={propsObj[selectedKey]?.[name]}
          onChange={onValueChange}
          options={field.options}
        />
      )}
    </>
  )
}

export default FormItem
