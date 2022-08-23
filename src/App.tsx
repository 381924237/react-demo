// import Container from './components/container'
// import Picture from './components/picture'
import Preview from './preview'
import Tree from './tree'
import Edit from './edit'
import './App.css'

// const test = (
//   <>
//     <Container
//       classList={[
//         'relative',
//         'flex',
//         'flex-col',
//         'items-center',
//         'bg-full',
//         'p-t-52',
//         'w-271',
//         'h-155',
//         'bg-img-1'
//       ]}
//     >
//       <Picture
//         classList={['w-125', 'h-39', 'm-t-20', 'm-b-10']}
//         src='https://audiotest.cos.tx.xmcdn.com/storages/ff21-audiotest/10/8E/GKwaDD0Gptx1AAA3_wAAa4cy.png'
//       />
//       <Container
//         children='1应援票=10偶像值'
//         classList={[
//           'fontSize-10',
//           'fontWeight-500',
//           'line-height-14',
//           'color-1'
//         ]}
//       />
//       <Container
//         children='人气票：5000'
//         classList={[
//           'fontSize-10',
//           'fontWeight-500',
//           'line-height-14',
//           'color-1'
//         ]}
//       />
//       <Picture
//         classList={['absolute-x-center', 'w-29', 'h-29', 'bottom--36']}
//         src='https://audiotest.cos.tx.xmcdn.com/storages/678a-audiotest/5C/81/GKwaDD0Gptx5AAADXwAAa4cz.png'
//       />
//     </Container>
//   </>
// )

function App() {
  return (
    <div className='wrap'>
      <Tree />
      <Preview />
      <Edit />
    </div>
  )
}

export default App
