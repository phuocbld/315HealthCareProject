import {combineReducers} from 'redux'
import branchReducer from './reducers/branchReducer'
import modalReducer from'./reducers/modalReducer'
import userReducer from './reducers/userReducer'
import receiveReducer from './reducers/receiveReducer'
import NhapKhoReducer from './reducers/NhapKhoReduer'
import chuyenKhoReducer from './reducers/chuyenKhoReducer'
import khamDoanReducer from './reducers/khamDoanReducer'
 export const rootReducer = combineReducers({
    branchReducer,
    modalReducer,
    userReducer,
    NhapKhoReducer,
    receiveReducer,
    chuyenKhoReducer,
    khamDoanReducer

})