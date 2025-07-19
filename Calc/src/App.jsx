import { useReducer, useState } from 'react'
import NumberButtons from './NumberButtons'
import FunctionButtons from './FunctionButtons'

import './App.css'

export const ACTIONS = 
{
  ADD_NUMBER: 'add-number',
  CHOOSE_FUNCTION: 'choose-function',
  CLEAR: 'clear',
  DELETE_NUMBER: 'delete-number',
  EVALUATE: 'evaluate'

}

const initialState = {
  currentNumber: "",
  previousNumber: "",
  calculation: ""
}

function reducer(state, { type, payload }) 
{
  switch (type) 
  {
    case ACTIONS.ADD_NUMBER:
      if (payload.number === "0" && state.currentNumber === "0")
      { 
        return state 
      }
      if (payload.number === "." && state.currentNumber.includes( "."))
      { 
        return state 
      }

      return {
        ...state,
        currentNumber: `${state.currentNumber || ""}${payload.number}`
      };


    case ACTIONS.CLEAR:
        return initialState;
  }
  
}


function App() 
{
const [{ currentNumber, previousNumber, calculation }, dispatch] = useReducer(reducer, initialState)
  return(
  <div className="calc-grid">
    <div className="output">
      <div className="firstNumber">{previousNumber} {calculation}</div>
        <div className="secNumber">{currentNumber}</div>
    </div>
    <button className="big-tile" onClick={() => dispatch({ type: ACTIONS.CLEAR})}>AC</button>
    <FunctionButtons func="DEL" dispatch={dispatch} />
    <FunctionButtons func="÷" dispatch={dispatch} />
    <NumberButtons number="1" dispatch={dispatch} />
    <NumberButtons number="2" dispatch={dispatch} />
    <NumberButtons number="3" dispatch={dispatch} />
    <FunctionButtons func="*" dispatch={dispatch} />
    <NumberButtons number="4" dispatch={dispatch} />
    <NumberButtons number="5" dispatch={dispatch} />
    <NumberButtons number="6" dispatch={dispatch} />
    <FunctionButtons func="+" dispatch={dispatch} />
    <NumberButtons number="7" dispatch={dispatch} />
    <NumberButtons number="8" dispatch={dispatch} />
    <NumberButtons number="9" dispatch={dispatch} />
    <FunctionButtons func="-" dispatch={dispatch} />
    <NumberButtons number="." dispatch={dispatch} />
    <NumberButtons number="0" dispatch={dispatch} />
    <button className="big-tile">=</button>
  </div>
  )
}

export default App
