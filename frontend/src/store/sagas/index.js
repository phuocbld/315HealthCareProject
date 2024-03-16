
import {all,} from "redux-saga/effects";
import { branchSaga } from "./branhSaga";
import { authSaga } from "./authSaga";


export function* rootSaga() {
    yield all ([
        branchSaga(),
        authSaga(),
    ])
}
