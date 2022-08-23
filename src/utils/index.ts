import produce from 'immer'

export const getSchema = (
  tree: ChildrenItem[],
  propsObj: { [key: string]: any }
) => {
  const newTree = produce(tree, (tree) => {
    operateTree(tree, {
      type: 'props',
      propsObj
    })
  })
  return JSON.stringify(newTree, null, 2)
}

interface AddType {
  type: 'add'
  key: string
  tag: string
}

interface DeleteType {
  type: 'delete'
  key: string
}

interface AttachPropsType {
  type: 'props'
  propsObj: { [key: string]: any }
}

export const getNewTree = (
  tree: ChildrenItem[],
  options: AddType | DeleteType | AttachPropsType
) => {
  return produce(tree, (tree) => {
    operateTree(tree, options)
  })
}

const operateTree = (
  tree: ChildrenItem[],
  options: AddType | DeleteType | AttachPropsType
) => {
  const { type } = options
  for (let i = 0; i < tree.length; i++) {
    if (type === 'add' && options.key === tree[i].key) {
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
      tree[i].children.findIndex((item) => item.key === options.key) !== -1
    ) {
      tree[i].children = tree[i].children.filter(
        (item) => item.key !== options.key
      )
      break
    }
    if (type === 'props' && !!options.propsObj[tree[i].key]) {
      tree[i].props = options.propsObj[tree[i].key]
    }
    operateTree(tree[i].children, options)
  }
}

export const getCode = (tree: ChildrenItem[]) => {}
