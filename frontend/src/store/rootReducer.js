import {combineReducers} from 'redux'
import branchReducer from './reducers/branchReducer'
 export const rootReducer = combineReducers({
    branchReducer,
})