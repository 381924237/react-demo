import create from 'zustand'
import { getNewTree, updateObj } from '../utils'

interface State {
  rootTree: ChildrenItem[]
  selectedKey: string
  propsObj: {
    [key: string]: any
  }
  setSelectedKey: (key: string) => void
  setProps: (namePath: string | string[], value: any) => void
  addNode: (key: string, tag: string) => void
  deleteNode: (key: string) => void
}

const useStore = create<State>((set, get) => ({
  rootTree: [
    {
      key: '0',
      name: 'root',
      componentName: 'div',
      children: []
    }
  ],
  selectedKey: '0',
  propsObj: {},
  setSelectedKey: (key: string) => {
    set({
      selectedKey: key
    })
  },
  setProps: (namePath: string | string[], value: any) => {
    const { selectedKey, propsObj } = get()
    const newObj = updateObj({
      obj: propsObj[selectedKey] || {},
      namePath,
      value
    })
    set({
      propsObj: {
        ...propsObj,
        [selectedKey]: newObj
      }
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
