import axios from "axios";
import {call,delay,fork,put,take,takeEvery,takeLatest} from "redux-saga/effects";
import  * as typeAction from'../constants/constants'
import { authService } from "../../services/auth/authService";

export function* authSaga() {
    yield takeLatest(typeAction.GET_LOGIN_API, function* login({type,payload,navigate}){
        try{
            const infoUser = yield put(authService.login(payload))
            yield put ({
                type:typeAction.OPEN_LOADING
            })
            yield put ({
                type:typeAction.DISPATCH_INFO_LOGIN,
                payload: infoUser
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
