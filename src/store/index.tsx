import create from 'zustand'

interface State {
  rootTree: ChildrenItem
  selectedKey: string
  propsMap: Map<string, any>
  setSelectedKey: (key: string) => void
  setProps: (props: any) => void
  addNode: (key: string, tag: string) => void
  deleteNode: (key: string) => void
}

const useStore = create<State>((set, get) => ({
  rootTree: {
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
  propsMap: new Map([['0', {}]]),
  setSelectedKey: (key: string) => {
    set({
      selectedKey: key
    })
  },
  setProps: (props: any) => {
    const { selectedKey, propsMap } = get()
    const newMap = new Map([...propsMap])
    newMap.set(selectedKey, {
      ...propsMap.get(selectedKey),
      ...props
    })
    set({
      propsMap: newMap
    })
  },
  addNode: (key, tag) => {
    console.log(key, tag)
  },
  deleteNode: (key) => {
    console.log(key)
  }
}))

export default useStore
