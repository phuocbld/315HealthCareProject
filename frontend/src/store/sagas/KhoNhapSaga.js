import {call,delay,fork,put,take,takeEvery,takeLatest} from "redux-saga/effects";
import * as typeAction from '../constants/constants'
import { NhapKhoService } from "../../services/NhapKho/NhapKhoService";
export function* NhapKhoSaga () {

    // get chi nhanh
    yield takeLatest(typeAction.GET_BRANCH_NHAPKHO,function* branch({type,payload}){
        // yield console.log(payload);
        const idBranch = localStorage.getItem('BRANH_LOGIN')
        const result = yield call(()=> NhapKhoService.getBranch(idBranch))
        yield put({
            type:typeAction.DISPATCH_BRANCH_NHAPKHO,
            payload:result.data
        })
    } )

}
