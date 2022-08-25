const CustomDemo = (props: any) => {
  const { style = {} } = props || {}
  return (
    <div
      className='custom-demo'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        background: '#ccc',
        ...style
      }}
    >
      自定义组件
      {props.children}
    </div>
  )
}

export default CustomDemo
