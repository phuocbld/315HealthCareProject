import {combineReducers} from 'redux'
import branchReducer from './reducers/branchReducer'
import modalReducer from'./reducers/modalReducer'
import userReducer from './reducers/userReducer'
 export const rootReducer = combineReducers({
    branchReducer,
    modalReducer,
    userReducer
})