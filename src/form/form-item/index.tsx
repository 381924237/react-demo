import useStore from '../../store'
import { Input, Select, InputNumber } from 'antd'
import { getValue } from '../../utils'
import './index.css'

interface Props {
  name: string | string[]
  label?: string
  field: InputProps | SelectProps | InputNumberProps
}

type InputProps = {
  type: 'Input'
}

type InputNumberProps = {
  type: 'InputNumber'
}

type SelectProps = {
  type: 'Select'
  options: { label: string; value: any }[]
}

const FormItem = ({ name, field, label }: Props) => {
  const { setProps, propsObj, selectedKey } = useStore()

  const onValueChange = (v: any) => {
    setProps(name, v)
  }
  return (
    <div className='form-item'>
      {label && <span className='label'>{label}：</span>}
      <span className='field'>
        {field.type === 'Input' && (
          <Input
            value={getValue({
              obj: propsObj[selectedKey],
              namePath: name
            })}
            onChange={(e) => {
              onValueChange(e.target.value)
            }}
          />
        )}
        {field.type === 'InputNumber' && (
          <InputNumber
            value={getValue({
              obj: propsObj[selectedKey],
              namePath: name
            })}
            onChange={(v) => {
              onValueChange(v)
            }}
          />
        )}
        {field.type === 'Select' && (
          <Select
            style={{ width: 150 }}
            value={getValue({
              obj: propsObj[selectedKey],
              namePath: name
            })}
            onChange={onValueChange}
            options={field.options}
          />
        )}
      </span>
    </div>
  )
}

export default FormItem
