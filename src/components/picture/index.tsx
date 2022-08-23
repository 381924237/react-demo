interface Props {
  src: string
  classList?: string[]
}

const Picture = ({ src, classList = [] }: Props) => {
  return <img alt='' src={src} className={classList.join(' ')} />
}

export default Picture
