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
import Swal from "sweetalert2";
import { chuyenKhoService } from "../../services/ChuyenKho/chuyenKhoService";
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
export function* ChuyenKhoSaga() {
  // get chi nhanh

  yield takeLatest(
    typeAction.GET_LIST_Ck_KHO_NHAN,
    function* branch({ type, payload }) {
      try {
        const result = yield call(() =>
          chuyenKhoService.getlistKhoNhan(payload)
        );
        yield put({
          type: typeAction.DISPATCH_Ck_KHO_NHAN,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
  // LẤY KHO VT
  yield takeLatest(
    typeAction.GET_CK_KHOVT,
    function* branch({ type, payload }) {
      try {
        const result = yield call(() => NhapKhoService.getInfoThuocVT(payload));
        yield put({
          type: typeAction.DISPATCH_CK_KHOVT,
          payload: {
            ...result.data,
            khoChiTiet: {
              idThuoc: result.data.IDTHUOC,
              soLuong: 1,
              trangThaiChuyenKho: 1,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

  // LƯU PHIẾU CHUYỂN KHO
  yield takeLatest(
    typeAction.POST_PHIEU_CK,
    function* branch({ type, payload, khoVT }) {
      try {
        const result = yield call(() =>
          chuyenKhoService.postChuyenKho(payload)
        );
        const id = yield result.data.data.idNhapXuat;
        const listKhoChiTiet = [];
        for (let items of khoVT) {
          listKhoChiTiet.push({ ...items.khoChiTiet, idNhapXuat: id });
        }
        console.log(listKhoChiTiet);
        yield call(() => NhapKhoService.postkhoChiTiet(listKhoChiTiet));
        Toast.fire({
          icon: "success",
          title: "Thêm Phiếu thành công !",
        });
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "Thêm Phiếu thất bại !",
        });
        console.log(err);
      }
    }
  );
}
