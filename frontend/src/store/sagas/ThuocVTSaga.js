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
import { recieveService } from "../../services/receive/recieveService";
import { khoVTservice } from "../../services/khoVT/khoVTservice";

export function* ThuocVTSaga() {
  //lấy danh sách thuốc vật tư
  yield takeLatest(
    typeAction.GET_ALL_THUOC_VT,
    function* listThuocVT({ type, payload }) {
      try {
        const result = yield call(() => khoVTservice.getAllVT());
        yield put({
          type: typeAction.DISPATCH_LIST_THUOCVT,
          payload: result.data,
        });
      } catch (err) {
        yield console.log(err);
      }
    }
  );
}
