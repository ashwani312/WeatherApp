import React from 'react'
import Weather from './Weather/Weather'
import Navbar from './componants/navbar/Navbar'
import './App.css'

export default function App() {
  return (
    <>
    <Navbar/>
    <div className='appContainer'>
      
      <Weather/>
      
    </div>
    </>
  )
}
