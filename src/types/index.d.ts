interface ChildrenItem {
  key: string
  nodeName: string
  componentName: string
  children: ChildrenItem[]
  isCustom?: boolean
  props?: ChildrenProps
}

interface ChildrenProps {}
