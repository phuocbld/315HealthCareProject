import axios from "axios";
import {call,delay,fork,put,take,takeEvery,takeLatest} from "redux-saga/effects";
import  * as typeAction from'../constants/constants'

export function* authSaga() {
    yield takeLatest(typeAction.LOGIN_USER, function* login({type,payload,navigate}){
        try{
            yield put ({
                type:typeAction.OPEN_LOADING
            })
           yield delay(1000)
           yield put({
            type:typeAction.CLOSE_LOADING
           })
            yield navigate('/')
        }catch(err){
            console.log(err);
        }
    })  
}
