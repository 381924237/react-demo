interface ChildrenItem {
  key: string
  name: string
  componentName: string
  children: ChildrenItem[]
  isCustom?: boolean
  props?: ChildrenProps
}

interface ChildrenProps {}
