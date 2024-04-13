import {call,delay,fork,put,take,takeEvery,takeLatest} from "redux-saga/effects";
import * as typeAction from '../constants/constants'
import { branchService } from "../../services/branch/branchService";
export function* branchSaga () {


    yield takeLatest(typeAction.GET_INFO_BRANCH_LOGIN,function* branchLogin({type,idChiNhanh}){
        // yield console.log(payload);
        const result = yield call(()=> branchService.getbranchLogin(idChiNhanh))
        
        yield put({
            type:typeAction.DISPATCH_BRANCH_LOGIN,
            payload:result.data
        })
    } )

    yield takeLatest(typeAction.GET_LIST_BRANCH_API,function* ListBranch({type,payload}){
        // yield console.log(payload);
        try{
            const  result = yield call(() => branchService.getListBranch())
            yield put({
                type: typeAction.DISPATCH_LIST_BRANCH,
                payload:result.data
            })
        } catch(err){
           yield console.log(err);
        }
       
    } ) 
    yield takeLatest(typeAction.GET_DEFAULT_BRANCH,function* getDefaultBranch({type,payload}){
        // yield console.log(payload);
        try{
            const  result = yield call(() => branchService.getDefaultBranch(payload))
            yield put({
                type: typeAction.DISPATCH_DEFAULT_BRANCH,
                payload:result.data.idChiNhanh
            })
        } catch(err){
            yield put({
                type: typeAction.DISPATCH_DEFAULT_BRANCH,
                payload:''
            })
           yield console.log(err);
        }
       
    } )

    yield takeLatest(typeAction.GET_LIST_CALAMVIEC,function* fetchListCaLamViec({type,payload}){
        try{
            const result = yield call(()=> branchService.getCaLamViet())
            yield put({
                type:typeAction.DISPATCH_lIST_CALAMVIEC,
                payload:result.data
            })
        } catch(err){
            console.log(err);
        }
    })
}
