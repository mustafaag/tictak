const initState = {
    history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      isAscending: true
}

const rootReducer = (state = initState, action) =>{
    if(action.type === 'ADD_X' ){
        
        return{
             ...state, 
             history: action.tmState.history,
             stepNumber: action.tmState.stepNumber,
             xIsNext: action.tmState.xIsNext
        }
    }

    return state;
}


export default rootReducer;
