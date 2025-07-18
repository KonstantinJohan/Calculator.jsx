import { useReducer, useState } from 'react'
import './App.css'

const ACTIONS = 
{
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'

}

function reducer(state, {type, payload})
{
  switch(type)
  {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currrentOperand: `${currentOperand || ""}${payload.digit}`
      } 
  }

}

function App() 
{
  const[{ firstNumber, secNumber, calculation}, discpatch] = useReducer(reducer,{})
  return(
  <div className="calc-grid">
    <div className="output">
      <div className="firstNumber">{firstNumber} {calculation}</div>
        <div className="secNumber">{secNumber}</div>
    </div>
    <button className="big-tile">AC</button>
    <button >DEL</button>
    <button >÷</button>
    <button >1</button>
    <button >2</button>
    <button >3</button>
    <button >*</button>
    <button >4</button>
    <button >5</button>
    <button >6</button>
    <button >+</button>
    <button >7</button>
    <button >8</button>
    <button >9</button>
    <button >-</button>
    <button >.</button>
    <button >0</button>
    <button className="big-tile">=</button>
  </div>
  )
}

export default App
