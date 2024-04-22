//import {v4 as uuidv4} from 'uuid'

var initialState = { }

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        // case 'LOAD': 
        //     return {...state, cars: action.payload};

        // case 'ADD':
        //     return {
        //         ...state,
        //         cars: [
        //             ...state.cars,
        //             {
        //                 id: uuidv4(),
        //                 ...action.payload,
        //                 state: 'ADDED'
        //             }
        //         ]
        //     };
        
        // case 'DELETE':
        //     const cars = [...state.cars]
        //     const idx = cars.findIndex(c => {return c.id === action.payload})
        //     if(idx !== -1){
        //         if(cars[idx].state == 'ADDED'){
        //             cars.splice(idx,1)
        //         }else{ // state == UNCHANGED
        //             cars[idx].state = 'DELETED'
        //         }
        //     }
        //     return {...state, cars: cars};
        
        // default:
        //     return state;
    }
}

export default rootReducer