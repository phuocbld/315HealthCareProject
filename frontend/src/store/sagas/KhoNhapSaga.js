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
    })

    //get kho nhập
    yield takeLatest(typeAction.GET_BRANCH_NHAPKHO,function* listKhoNhap({type,payload}){
        // yield console.log(payload);
        const idBranch = localStorage.getItem('BRANH_LOGIN')
        const result = yield call(()=> NhapKhoService.getListKhoNhap(idBranch))
        yield put({
            type:typeAction.DISPATCH_LIST_KHONHAP,
            payload:result.data
        })
        yield put({
            type:typeAction.DISPATCH_DEFAULT_KHONHAP,
            payload:result.data[0].idKho
        })
    })

    //get list đối tác 
    yield takeLatest(typeAction.GET_LIST_DOITAC,function* listDoiTac({type,payload}){
        // yield console.log(payload);
       
        const result = yield call(()=> NhapKhoService.getListDoiTac())
        yield put({
            type:typeAction.DISPATCH_LIST_DOITAC,
            payload:result.data
        })
    })
    //get info Đối tác 
    yield takeLatest(typeAction.GET_INFO_DOITCA,function* infoDoiTac({type,payload}){
        // yield console.log(payload);
        const result = yield call(()=> NhapKhoService.getInfoDoiTac(payload))
        yield put({
            type:typeAction.DISPATCH_INFO_DOITAC,
            payload:result.data
        })
    })

}
