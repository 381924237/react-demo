import create from 'zustand'
import { getNewTree } from '../utils'

interface State {
  rootTree: ChildrenItem[]
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
  rootTree: [
    {
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
    }
  ],
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
    const tree = get().rootTree
    const newTree = getNewTree(tree, { type: 'add', key, tag })
    set({
      rootTree: newTree
    })
  },
  deleteNode: (key) => {
    const tree = get().rootTree
    const newTree = getNewTree(tree, { type: 'delete', key })
    set({
      rootTree: newTree
    })
  }
}))

export default useStore
