import CustomDemo from './custom-demo'

const customComponentObj: {
  [key: string]: {
    name: string
    component: any
  }
} = {
  'custom-demo': {
    name: '自定义组件demo',
    component: CustomDemo
  }
}

export { customComponentObj }
