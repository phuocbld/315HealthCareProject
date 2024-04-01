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
import { NhapKhoService } from "../../services/NhapKho/NhapKhoService";
export function* NhapKhoSaga() {
  // get chi nhanh
  yield takeLatest(
    typeAction.GET_BRANCH_NHAPKHO,
    function* branch({ type, payload }) {
      // yield console.log(payload);
      const idBranch = localStorage.getItem("BRANH_LOGIN");
      const result = yield call(() => NhapKhoService.getBranch(idBranch));
      yield put({
        type: typeAction.DISPATCH_BRANCH_NHAPKHO,
        payload: result.data,
      });
    }
  );

  //get kho nhập
  yield takeLatest(
    typeAction.GET_BRANCH_NHAPKHO,
    function* listKhoNhap({ type, payload }) {
      // yield console.log(payload);
      const idBranch = localStorage.getItem("BRANH_LOGIN");
      const result = yield call(() => NhapKhoService.getListKhoNhap(idBranch));
      yield put({
        type: typeAction.DISPATCH_LIST_KHONHAP,
        payload: result.data,
      });
      yield put({
        type: typeAction.DISPATCH_DEFAULT_KHONHAP,
        payload: result.data[0].idKho,
      });
    }
  );

  //get list đối tác
  yield takeLatest(
    typeAction.GET_LIST_DOITAC,
    function* listDoiTac({ type, payload }) {
      // yield console.log(payload);

      const result = yield call(() => NhapKhoService.getListDoiTac());
      yield put({
        type: typeAction.DISPATCH_LIST_DOITAC,
        payload: result.data,
      });
    }
  );
  //get info Đối tác
  yield takeLatest(
    typeAction.GET_INFO_DOITCA,
    function* infoDoiTac({ type, payload }) {
      // yield console.log(payload);
      const result = yield call(() => NhapKhoService.getInfoDoiTac(payload));
      yield put({
        type: typeAction.DISPATCH_INFO_DOITAC,
        payload: result.data,
      });
    }
  );
  // get add list thuốc vật tư
  yield takeLatest(
    typeAction.GET_ALL_THUOCVT,
    function* getAllVTYT({ type, payload }) {
      // yield console.log(payload);
      const result = yield call(() => NhapKhoService.getAllThuocVT());
      yield put({
        type: typeAction.DISPATCH_ALL_THUOCVT,
        payload: result.data,
      });
    }
  );
  // get info thuốc và vật tư
  yield takeLatest(
    typeAction.GET_INFO_THUOCVT,
    function* getInfoVTYT({ type, payload }) {
      const result = yield call(() => NhapKhoService.getInfoThuocVT(payload));
      const data = result.data;
      const  khoChiTiet = yield {
        idThuoc: data.idThuoc,
        soLo: "",
        hanDung: null,
        soLuong: 1,
        donGiaMua: data.donGia,
        donGiaBan: 0,
        phiVanChuyen: 0,
        phiGiaCong: 0,
        soLuongNhan: 0,
        trangThaiChuyenKho: 3,
        ptckTruocVat: 0,
        ckTruocVat: 0,
        vat5: 0,
        vat8: 0,
        vat10: 0,
        thanhTien: 0,
        thucTra: 0,
      }
      yield put({
        type: typeAction.DISPATCH_LIST_INFO_THUOCVT,
        payload: {...data,...khoChiTiet}
      });
    }
  );
}
