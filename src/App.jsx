import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Productos from './UI/Productos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Productos></Productos>
    </>
  )
}

export default App
