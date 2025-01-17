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
import { getAllPhieuNhapKho } from "../actions/NhapKhoAction";
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
export function* NhapKhoSaga() {
  // get chi nhanh

  yield takeLatest(
    typeAction.GET_BRANCH_NHAPKHO,
    function* branch({ type, payload }) {
      // yield console.log(payload);
      try {
        const idBranch = localStorage.getItem("BRANH_LOGIN");
        const result = yield call(() => NhapKhoService.getBranch(idBranch));
        yield put({
          type: typeAction.DISPATCH_BRANCH_NHAPKHO,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

  //get kho nhập
  yield takeLatest(
    typeAction.GET_BRANCH_NHAPKHO,
    function* listKhoNhap({ type, idChiNhanh }) {
      // yield console.log(payload);
      try {
        const result = yield call(() =>
          NhapKhoService.getListKhoNhap(idChiNhanh)
        );
        yield put({
          type: typeAction.DISPATCH_LIST_KHONHAP,
          payload: result.data,
        });
        yield put({
          type: typeAction.DISPATCH_DEFAULT_KHONHAP,
          payload: result.data[0].idKho,
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  //get list đối tác
  yield takeLatest(
    typeAction.GET_LIST_DOITAC,
    function* listDoiTac({ type, payload }) {
      // yield console.log(payload);
      try {
        const result = yield call(() => NhapKhoService.getListDoiTac());
        yield put({
          type: typeAction.DISPATCH_LIST_DOITAC,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
  //get info Đối tác
  yield takeLatest(
    typeAction.GET_INFO_DOITCA,
    function* infoDoiTac({ type, payload }) {
      // yield console.log(payload);
      try {
        const result = yield call(() => NhapKhoService.getInfoDoiTac(payload));
        yield put({
          type: typeAction.DISPATCH_INFO_DOITAC,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
  // get add list thuốc vật tư
  // yield takeLatest(
  //   typeAction.GET_ALL_THUOCVT,
  //   function* getAllVTYT({ type, payload }) {
  //     // yield console.log(payload);
  //     try {
  //       const result = yield call(() => NhapKhoService.getAllThuocVT());
  //       yield put({
  //         type: typeAction.DISPATCH_ALL_THUOCVT,
  //         payload: result.data,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // );
  // get info thuốc và vật tư
  yield takeLatest(
    typeAction.GET_INFO_THUOCVT,
    function* getInfoVTYT({ type, payload }) {
      try {
        const result = yield call(() => NhapKhoService.getInfoThuocVT(payload));
        const data = result.data;
        const formKhoChiTiet = yield {
          tienVAT: 0,
          ptVAT: 0,
          idThuoc: data.IDTHUOC,
          soLo: "",
          hanDung: null,
          soLuong: 1,
          donGiaMua: data.GIABAN,
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
          thanhTien: data.GIABAN,
          thucTra: data.GIABAN,
          soLuongDongGoi: data.QUYCACHDONGGOI,
          quyCachDongGoi: data.QUYCACH,
        };
        yield put({
          type: typeAction.DISPATCH_LIST_INFO_THUOCVT,
          payload: { ...data, khoChiTiet: formKhoChiTiet },
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

  //ADD Phiếu nhập kho và kho chi tiết
  yield takeLatest(
    typeAction.POST_PHIEU_NHAP_KHO,
    function* postPhieuNhapKho({ type, payload, ListThuocVT }) {
      // yield console.log(payload);
      try {
        console.log(payload);
        const result = yield call(() => NhapKhoService.postPhieuNhap(payload));
        const id = yield result.data.data.idNhapXuat;
        const array = [];
        for (let item of ListThuocVT) {
          const { khoChiTiet, ...others } = item;
          const { tienVAT, ptVAT, ...data } = khoChiTiet;
          data.idNhapXuat = id;
          data.soLuongLe = item.khoChiTiet.soLuong * item.QUYCACHDONGGOI
          array.push(data);
        }
        console.log(array);
        yield call(() => NhapKhoService.postkhoChiTiet(array));
        // console.log(result.data);
        Toast.fire({
          icon: "success",
          title: "Thêm Phiếu nhập thành công",
        });
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Thêm Phiếu thất bại !",
        });
      }
    }
  );
  // get add list phiếu nhập kho
  yield takeLatest(
    typeAction.GET_ALL_PHIEU_NHAP,
    function* getAllListPhieuNhap({ type, payload }) {
      // yield console.log(payload);
      try {
        const result = yield call(() => NhapKhoService.getPhieuNhapKho());
        yield put({
          type: typeAction.DISPATCH_LIST_PHIEU_NHAP,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

  // DELETE PHIẾU NHẬP KHO THEO ID PHIẾU NHẬP KHO
  yield takeLatest(
    typeAction.DELETE_PHIEU_NHAP_KHO,
    function* deletePhieuNhap({ type, idPhieu }) {
      try {
        yield call(() => NhapKhoService.deletePhieu(idPhieu)); // sau khi xoá phiếu thành công tải lại danh sách phiếu nhập kho
        yield put(getAllPhieuNhapKho());
        Toast.fire({
          icon: "success",
          title: "Xoá phiếu thành công !",
        });
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "Xoá phiếu thất bại !",
        });
        console.log(err);
      }
    }
  );
  // LẤY THÔNG TIN PHIẾU NHẬP KHO THEO ID
  yield takeLatest(
    typeAction.GET_INFO_PT_NHAP_KHO,
    function* infoPTNhapKho({ type, idNhapXuat }) {
      try {
        const result = yield call(() =>
          NhapKhoService.getInfoPTNhapKho(idNhapXuat)
        ); //
        yield put({
          type: typeAction.DISPATCH_INFO_PT_NHAP_KHO,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
  // FILTER DANH SÁCH PHIẾU NHẬP KHO
  yield takeLatest(
    typeAction.GET_FILTER_PT_NHAP_KHO,
    function* infoPTNhapKho({ type, filter }) {
      try {
        yield put({
          type: typeAction.OPEN_LOADING_TABLE_NHAP_KHO,
        });
        const result = yield call(() =>
          NhapKhoService.getPTBycondition(filter)
        ); //
        yield put({
          type: typeAction.DISPATCH_LIST_PHIEU_NHAP,
          payload: result.data,
        });
        yield put({
          type: typeAction.CLOSE_LOADING_TABLE_NHAP_KHO,
        });
      } catch (err) {
        yield put({
          type: typeAction.OPEN_LOADING_TABLE_NHAP_KHO,
        });
        console.log(err);
      }
    }
  );
  // Lây Danh sách thuốc vật tư theo keyword
  yield takeLatest(
    typeAction.GET_THUOCVT_BY_KEYWORD,
    function* SearchThuocVT({ type, keyword }) {
      try {
        const result = yield call(() =>
          NhapKhoService.getThuocVTByKeyword(keyword)
        ); //
        yield put({
          type: typeAction.DISPATCH_ALL_THUOCVT,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
}
