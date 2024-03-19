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

    yield takeLatest(typeAction.DISPATCH_LIST_BRANCH,function* ListBranch({type,payload}){
        // yield console.log(payload);
        try{
            const  result = yield call(() => branchService.getListBranch())
         yield console.log(result);
        } catch(err){
           yield console.log(err);
        }
       
    } ) 
}