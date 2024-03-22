import {call,delay,fork,put,take,takeEvery,takeLatest} from "redux-saga/effects";
import * as typeAction from '../constants/constants'
import { branchService } from "../../services/branch/branchService";
export function* branchSaga () {


    yield takeLatest('DEMO_MODAL',function* changeModal({type,payload}){
        // yield console.log(payload);
        yield put({
            type:"TRUE_MODAL"
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
}
