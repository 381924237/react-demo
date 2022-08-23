interface Props {
  classList?: string[]
  children?: any
}

const Container = ({ children, classList = [] }: Props) => {
  return <div className={classList.join(' ')}>{children}</div>
}

export default Container
