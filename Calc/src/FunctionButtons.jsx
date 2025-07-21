import { ACTIONS } from "./App"

export default function FunctionButtons ({ dispatch, calc })
{
    return <button onClick={() => dispatch({type: ACTIONS.CHOOSE_FUNCTION, payload: {calc} })}>
               {calc}
           </button>
}