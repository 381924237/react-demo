import './index.css'

interface Props {
  isSelected: boolean
  node: ChildrenItem
}

const PreviewItem = ({ isSelected }: Props) => {
  return <div className={`preview-item ${isSelected ? 'selected' : ''}`}></div>
}

export default PreviewItem
