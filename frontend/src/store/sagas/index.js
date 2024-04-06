
import {all,} from "redux-saga/effects";
import { branchSaga } from "./branhSaga";
import { authSaga } from "./authSaga";
import { receiveSaga } from "./receiveSaga";
import { NhapKhoSaga } from "./KhoNhapSaga";
import { ChuyenKhoSaga } from "./ChuyenKhoSaga";
import {khamDoanSaga} from './khamDoanSaga'



export function* rootSaga() {
    yield all ([
        branchSaga(),
        authSaga(),
        receiveSaga(),
        NhapKhoSaga(),
        ChuyenKhoSaga(),
        khamDoanSaga(),
    ])
}
