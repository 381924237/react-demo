import produce from 'immer'
import PreviewItem from '../preview/components/preview-item'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

export const attachPropsToNode = (
  tree: ChildrenItem[],
  propsObj: { [key: string]: any }
) => {
  return produce(tree, (tree) => {
    operateTree(tree, {
      type: 'props',
      propsObj
    })
  })
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

const renderItem = (
  tree: ChildrenItem[]
): React.FunctionComponentElement<any>[] => {
  return tree.map((item) =>
    React.createElement(
      PreviewItem,
      {
        key: item.key,
        node: item,
        nodeProps: item.props
      },
      renderItem(item.children)
    )
  )
}

export const getCode = (tree: ChildrenItem[]) => {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(
      PreviewItem,
      {
        node: tree[0],
        nodeProps: tree[0].props
      },
      renderItem(tree[0].children)
    )
  )
}

export const updateObj = (options: {
  obj?: { [key: string]: any }
  namePath: string | string[]
  value: any
}) => {
  const { obj = {}, namePath, value } = options
  const pathList = typeof namePath === 'string' ? [namePath] : namePath
  return produce(obj, (obj) => {
    let i = 0
    let currentObj = obj
    while (i < pathList.length - 1) {
      if (!currentObj[pathList[i]]) {
        currentObj[pathList[i]] = {}
      }
      currentObj = currentObj[pathList[i]]
      i++
    }
    currentObj[pathList[i]] = value
  })
}

export const getValue = (options: {
  obj?: { [key: string]: any }
  namePath: string | string[]
}) => {
  const { obj = {}, namePath } = options
  const pathList = typeof namePath === 'string' ? [namePath] : namePath
  let i = 0
  let currentObj = obj
  while (i < pathList.length - 1) {
    if (!currentObj[pathList[i]]) {
      return undefined
    }
    currentObj = currentObj[pathList[i]]
    i++
  }
  return currentObj[pathList[i]]
}
