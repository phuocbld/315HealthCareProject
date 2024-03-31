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
import { branchService } from "../../services/branch/branchService";
import { menuService } from "../../services/menu/menuService";

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
        console.log(payload);
        yield put({
          type: typeAction.OPEN_LOADING,
        });
        yield put({
          type: typeAction.DISPATCH_INFO_LOGIN,
          payload: infoUser.data,
        });
        localStorage.setItem("USER_INFO", JSON.stringify(infoUser.data));
        localStorage.setItem("BRANH_LOGIN", JSON.stringify(payload.idChiNhanh));
        yield delay(500);
        // lấy ra tên và id chi nhánh đăng nhập
        const branchLogin = yield call(() =>
          branchService.getbranchLogin(payload.idChiNhanh)
        );
        yield put({
          type: typeAction.CLOSE_LOADING,
        });
        yield put({
          type: typeAction.DISPATCH_BRANCH_LOGIN,
          payload: {
            idChiNhanh:payload.idChiNhanh,
            tenChiNhanh:branchLogin.data
          },
        });
        yield navigate("/");
        Toast.fire({
          icon: "success",
          title: "Đăng nhập thành công !",
        });
      } catch (err) {
        yield put({
          type: typeAction.CLOSE_LOADING,
        });
        Toast.fire({
          icon: "error",
          title: "Tài Khoản hoặc mật khẩu không đúng !",
        });
        console.log(err);
      }
    }
  );

  //logout user
  yield takeLatest(typeAction.LOGOUT_USER, function* logout({ navigate }) {
    try {
      yield localStorage.removeItem("USER_INFO");
      yield localStorage.removeItem("BRANH_LOGIN");
      yield put({
        type: typeAction.DISPATCH_LOGOUT_USER,
        payload: null,
      });
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
  });

  // lấy menu theo phân quyền người dùng
  yield takeLatest(typeAction.GET_LIST_MENU, function* listMenu({type,payload}){
    try{
      const result = yield call(()=>menuService.getlistMenu(payload))
      yield put({
        type:typeAction.DISPATCH_MENU,
        payload:result.data
      })
    } catch (error) {
      console.log(error);
    }
  })
}
