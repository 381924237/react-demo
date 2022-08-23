import create from 'zustand'
import produce from 'immer'

interface State {
  rootNode: ChildrenItem
  selectedKey: string
  propsObj: {
    [key: string]: any
  }
  setSelectedKey: (key: string) => void
  setProps: (props: any) => void
  addNode: (key: string, tag: string) => void
  deleteNode: (key: string) => void
}

const useStore = create<State>((set, get) => ({
  rootNode: {
    key: '0',
    name: 'root',
    componentName: 'div',
    children: [
      {
        key: '0-1',
        name: 'div',
        componentName: 'div',
        children: []
      }
    ]
  },
  selectedKey: '0',
  propsObj: {},
  setSelectedKey: (key: string) => {
    set({
      selectedKey: key
    })
  },
  setProps: (props: any) => {
    const { selectedKey, propsObj } = get()
    const newPropsObj = {
      ...propsObj,
      [selectedKey]: {
        ...propsObj[selectedKey],
        ...props
      }
    }
    set({
      propsObj: newPropsObj
    })
  },
  addNode: (key, tag) => {
    const tree = [get().rootNode]
    const nextTree = produce(tree, (tree) => {
      changeTree(tree, { type: 'add', key, tag })
    })
    set({
      rootNode: nextTree[0]
    })
  },
  deleteNode: (key) => {
    const tree = [get().rootNode]
    const nextTree = produce(tree, (tree) => {
      changeTree(tree, { type: 'delete', key })
    })
    set({
      rootNode: nextTree[0]
    })
  }
}))

interface AddProps {
  type: 'add'
  key: string
  tag: string
}

interface DeleteProps {
  type: 'delete'
  key: string
}

const changeTree = (tree: ChildrenItem[], options: AddProps | DeleteProps) => {
  const { type, key } = options
  for (let i = 0; i < tree.length; i++) {
    if (type === 'add' && key === tree[i].key) {
      tree[i].children = [
        ...tree[i].children,
        {
          key: `${tree[i].key}-${tree[i].children.length + 1}`,
          name: options.tag,
          componentName: options.tag,
          children: []
        }
      ]
      break
    }
    if (
      type === 'delete' &&
      tree[i].children.findIndex((item) => item.key === key) !== -1
    ) {
      tree[i].children = tree[i].children.filter((item) => item.key !== key)
    }
    changeTree(tree[i].children, options)
  }
}

export default useStore
