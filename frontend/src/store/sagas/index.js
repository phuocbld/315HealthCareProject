
import {all,} from "redux-saga/effects";
import { branchSaga } from "./branhSaga";
import { authSaga } from "./authSaga";
import { receiveSaga } from "./receiveSaga";



export function* rootSaga() {
    yield all ([
        branchSaga(),
        authSaga(),
        receiveSaga(),
    ])
}
