import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Navbar from './UI/Navbar';
import Productos from './UI/Productos';
import Contenido from './UI/Contenido';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
      <Productos />
    </div>
    </>
  )
}

export default App
