import { ACTIONS } from "./App"

export default function NumberButtons ({ dispatch, number })
{
    return <button onClick={() => dispatch({type: ACTIONS.ADD_NUMBER, payload: {number} })}>
               {number}
           </button>
}