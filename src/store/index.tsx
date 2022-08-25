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
  addNode: (options: {
    key: string
    nodeName: string
    componentName: string
    isCustom?: boolean
  }) => void
  deleteNode: (key: string) => void
}

const useStore = create<State>((set, get) => ({
  rootTree: [
    {
      key: '0',
      nodeName: 'root',
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
  addNode: ({ key, nodeName, componentName, isCustom }) => {
    const tree = get().rootTree
    const newTree = getNewTree(tree, {
      type: 'add',
      key,
      componentName,
      nodeName,
      isCustom
    })
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
