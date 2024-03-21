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
  //login user
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
          payload: infoUser.data,
        });
        localStorage.setItem('USER_INFO',JSON.stringify(infoUser.data))
        yield delay(500);
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
          title: "Tài Khoản hoặc mật khẩu không đúng !",
        });
        console.log(err);
      }
    }
  );

  //logout user
  yield takeLatest(
    typeAction.LOGOUT_USER,
    function* logout({  navigate }) {
      try {
        yield localStorage.removeItem("USER_INFO")
        yield put({
          type: typeAction.DISPATCH_LOGOUT_USER,
          payload: null
      })
        yield navigate("/login");
        Toast.fire({
          icon: "success",
          title: "Đăng xuất thành công !",
        });
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "Đăng xuất thật bại !",
        });
        console.log(err);
      }
    }
  );
}
