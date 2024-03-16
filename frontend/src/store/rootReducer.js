import {combineReducers} from 'redux'
import branchReducer from './reducers/branchReducer'
import modalReducer from'./reducers/modalReducer'
 export const rootReducer = combineReducers({
    branchReducer,
    modalReducer
})