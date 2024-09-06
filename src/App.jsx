import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Navbar from './UI/Navbar';
import Productos from './UI/Productos';
import Contenido from './UI/Contenido';
import Hero from './UI/Hero';

function App() {
  return (
    <>
      <div className="App">
      <Navbar/>
      <Hero/>
      
    </div>
    </>
  )
}

export default App
