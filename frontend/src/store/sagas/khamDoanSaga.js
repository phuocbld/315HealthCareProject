import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import * as typeAction from "../constants/constants";
import { branchService } from "../../services/branch/branchService";
import { khamDoanService } from "../../services/khamDoan/KhamDoanService";
export function* khamDoanSaga() {
  yield takeLatest(
    typeAction.GET_ALL_BN_KHAM_DOAN,
    function* AllBnKhamDoan({ type, payload }) {
      try {
        const result = yield call(() => khamDoanService.getAllBNKhamDoan());
        yield put({
          type: typeAction.DISPATCH_LIST_ALL_BN_KHAM_DOAN,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
  // THÊM BỆNH NHÂN KHÁM ĐOÀN
  yield takeLatest(
    typeAction.POST_BN_KHAM_DOAN,
    function* postBn({ type, payload }) {
      try {
        const arr=[]
        yield arr.push(payload)
        yield call(() => khamDoanService.postBNKhamDoan(arr));
        const result = yield call(() => khamDoanService.getAllBNKhamDoan());
        yield put({
          type: typeAction.DISPATCH_LIST_ALL_BN_KHAM_DOAN,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
  // LẤY DANH SÁCH CÔNG TY KHÁM ĐOÀN
  yield takeLatest(
    typeAction.GET_ALL_LIST_CTY,
    function* getAllCty({ type, payload }) {
      try {
        const result = yield call(() => khamDoanService.getAllCtyKhamDoan());
        yield put({
          type: typeAction.DISPATCH_ALL_CTY_KHAM_DOAN,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
}
