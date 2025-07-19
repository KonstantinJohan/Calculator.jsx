import { ACTIONS } from "./App"

export default function FunctionButtons ({ dispatch, func })
{
    return <button onClick={() => dispatch({type: ACTIONS.CHOOSE_FUNCTION, payload: {func} })}>
               {func}
           </button>
}