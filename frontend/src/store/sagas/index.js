import axios from "axios";
import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  all,
} from "redux-saga/effects";
import { branchSaga } from "./branhSaga";


export function* rootSaga() {
    yield all ([
        branchSaga(),
    ])
}
