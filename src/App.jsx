import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from './UI/Navbar';
import Productos from './UI/Productos';
import Contenido from './UI/Contenido';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Productos></Productos>
    </>
  )
}

export default App
