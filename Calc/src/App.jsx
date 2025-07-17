import { useState } from 'react'
import './App.css'

function App() 
{
  return(
  <div className="calc-grid">
    <div className="output">
      <div className="firstNumber">1111 + </div>
        <div className="secNumber">11111</div>
    </div>
    <button className="bigDigit">AC</button>
    <button className="smallDigit">DEL</button>
    <button className="smallDigit">÷</button>
    <button className="smallDigit">1</button>
    <button className="smallDigit">2</button>
    <button className="smallDigit">3</button>
    <button className="smallDigit">*</button>
    <button className="smallDigit">4</button>
    <button className="smallDigit">5</button>
    <button className="smallDigit">6</button>
    <button className="smallDigit">+</button>
    <button className="smallDigit">7</button>
    <button className="smallDigit">8</button>
    <button className="smallDigit">9</button>
    <button className="smallDigit">-</button>
    <button className="smallDigit">.</button>
    <button className="smallDigit">0</button>
    <button className="bigDigit">=</button>
  </div>
  )
}

export default App
