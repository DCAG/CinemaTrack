//import {v4 as uuidv4} from 'uuid'

import axios from "axios";

var initialState = {
    movies: [],
    members: [],
    users: [],
    loading: true,
    error: null
}


const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_DATA_SUCCESS':
            return { ...state, users: action.payload, loading: false };
        case 'FETCH_DATA_ERROR':
            return { ...state, error: action.error, loading: false };
        case 'MOVIE_CREATE':
            return state;
        case 'MOVIE_UPDATE':
            return state;
        case 'MOVIE_DELETE':
            return state;
        case 'SUB_CREATE':
            return state;
        case 'SUB_DELETE':
            return state;
        case 'MEMBER_CREATE':
            return state;
        case 'MEMBER_UPDATE':
            return state;
        case 'MEMBER_DELETE':
            return state;
        case 'USER_CREATE':
            return state;
        case 'USER_UPDATE':
            return state;
        case 'USER_DELETE':
            return state;
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
        
        default:
            return state;
    }
}

export default rootReducer