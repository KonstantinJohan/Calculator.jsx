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
      if(state.overwrite)
      {
        return{
          ...state,
          currentNumber: payload.number,
          overwrite: false
        }
      }
       if(state.currentNumber === "SYNTAX ERROR")
      {
        return initialState;
      }
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
        overwrite: true,
        previousNumber: "",
        calculationType: "",
        currentNumber: evaluate(state)
      }

    case ACTIONS.DELETE_NUMBER:
      if (state.overwrite)
      {
        return{
          ...state,
          overwrite:false,
          currentNumber: ""
        }
      }
      if(state.currentNumber === "SYNTAX ERROR")
      {
        return initialState;
      }
      
      return {
        ...state,
        currentNumber: state.currentNumber.slice(0, -1)
      }

    case ACTIONS.CLEAR:
      return initialState;
        
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

const Formatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 20, // Tillräckligt högt för att inte kapa decimaler
});

function formatNumber(number) {
  if (number === "") return "";

  if (isNaN(Number(number))) {
    return number;
  }

  const [integer, decimal] = number.split(".");

  const formattedInteger = Formatter.format(Number(integer));

  return decimal != null ? `${formattedInteger}.${decimal}` : formattedInteger;
}



function App() 
{
const [{ currentNumber, previousNumber, calculationType }, dispatch] = useReducer(reducer, initialState)
  return(
  <div className="calc-grid">
    <div className="output">
      <div className="firstNumber">{formatNumber(previousNumber)} {calculationType}</div>
        <div className="secNumber">{formatNumber(currentNumber)}</div>
    </div>
    <button className="big-tile" onClick={() => dispatch({ type: ACTIONS.CLEAR})}>AC</button>
    <button className onClick={() => dispatch({ type: ACTIONS.DELETE_NUMBER})}>DEL</button>
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

// Fråga gpt om reducer. payload, state, dispatch 