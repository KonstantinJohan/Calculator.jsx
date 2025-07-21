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
  calculationType: ""
}

function reducer(state, { type, payload }) 
{
  switch (type) 
  {
    case ACTIONS.ADD_NUMBER:
      if (payload.number === "0" && state.currentNumber === "0")
      { 
        return state;
      }
      if (payload.number === "." && state.currentNumber.includes( "."))
      { 
        return state;
      }

      return {
        ...state,
        currentNumber: `${state.currentNumber || ""}${payload.number}`
      };

    case ACTIONS.CHOOSE_FUNCTION:
        if (state.currentNumber === "" && state.previousNumber === "" )
        {
          return state;
        }
        if (state.currentNumber === "")
        {
          return {
            ...state,
            calculationType: payload.calc
          }
        }
        if (state.previousNumber === "")
        {
          return {
            ...state,
            calculationType: payload.calc,
            previousNumber: state.currentNumber,
            currentNumber: ""
          }
        }
        //Default if more than one function buttons is used.
        return {
            ...state,
            previousNumber: evaluate(state),
            calculationType: payload.calc,
            currentNumber: ""
          }

    case ACTIONS.CLEAR:
        return initialState;

    case ACTIONS.EVALUATE:
      if(state.calculationType === "" || state.previousNumber === "" || state.currentNumber === "")
      {
        return {
        ...state,
        previousNumber: "",
        calculationType: "",
        currentNumber: "SYNTAX ERROR"
        }
       
      }

      return {
        ...state,
        previousNumber: "",
        calculationType: "",
        currentNumber: evaluate(state)
      }
        
  }
  
}

function evaluate({ currentNumber, previousNumber, calculationType})
{
  const prev = parseFloat(previousNumber)
  const current = parseFloat(currentNumber)
  if( isNaN(prev) || isNaN(current)) 
  {
    return "";
  }
  let computation = "";

  switch (calculationType)
  {
    case "+":
      computation = prev + current
      break;

    case "-":
      computation = prev - current
      break;

    case "*":
      computation = prev * current
      break;

    case "÷":
      computation = prev / current
      break;
  }
  return computation.toString();

}


function App() 
{
const [{ currentNumber, previousNumber, calculationType }, dispatch] = useReducer(reducer, initialState)
  return(
  <div className="calc-grid">
    <div className="output">
      <div className="firstNumber">{previousNumber} {calculationType}</div>
        <div className="secNumber">{currentNumber}</div>
    </div>
    <button className="big-tile" onClick={() => dispatch({ type: ACTIONS.CLEAR})}>AC</button>
    <FunctionButtons calc="DEL" dispatch={dispatch} />
    <FunctionButtons calc="÷" dispatch={dispatch} />
    <NumberButtons number="1" dispatch={dispatch} />
    <NumberButtons number="2" dispatch={dispatch} />
    <NumberButtons number="3" dispatch={dispatch} />
    <FunctionButtons calc="*" dispatch={dispatch} />
    <NumberButtons number="4" dispatch={dispatch} />
    <NumberButtons number="5" dispatch={dispatch} />
    <NumberButtons number="6" dispatch={dispatch} />
    <FunctionButtons calc="-" dispatch={dispatch} />
    <NumberButtons number="7" dispatch={dispatch} />
    <NumberButtons number="8" dispatch={dispatch} />
    <NumberButtons number="9" dispatch={dispatch} />
    <FunctionButtons calc="+" dispatch={dispatch} />
    <NumberButtons number="." dispatch={dispatch} />
    <NumberButtons number="0" dispatch={dispatch} />
    <button className="big-tile" onClick={() => dispatch({ type: ACTIONS.EVALUATE})}>=</button>
  </div>
  );
}

export default App
