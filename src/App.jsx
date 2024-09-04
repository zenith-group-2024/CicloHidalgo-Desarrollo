import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './UI/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
      <Navbar />
      {/* Otros componentes o contenido aquí */}
    </div>
    </>
  )
}

export default App
