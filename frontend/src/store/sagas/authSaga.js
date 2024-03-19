import axios from "axios";
import React from "react";
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
import { authService } from "../../services/auth/authService";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2600,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export function* authSaga() {
  yield takeLatest(
    typeAction.GET_LOGIN_API,
    function* login({ type, payload, navigate }) {
      try {
        const infoUser = yield call(() => authService.login(payload));
        yield put({
          type: typeAction.OPEN_LOADING,
        });
        yield put({
          type: typeAction.DISPATCH_INFO_LOGIN,
          payload: infoUser,
        });
        yield delay(1000);
        yield put({
          type: typeAction.CLOSE_LOADING,
        });
        yield navigate("/");
        Toast.fire({
          icon: "success",
          title: "Đăng nhập thành công !",
        });
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "Tài Khoản hoặc mật khẩu khôgn đúng !",
        });
        console.log(err);
      }
    }
  );
}
