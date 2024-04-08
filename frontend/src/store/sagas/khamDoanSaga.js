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
import Swal from "sweetalert2";
import { getAllBNKhamDoan, getListCtyKhamDoan } from "../actions/khamDoanAction";
import moment from "moment";
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
        const arr = [];
        yield arr.push(payload);
        console.log(arr);
        yield call(() => khamDoanService.postBNKhamDoan(arr));
        const result = yield call(() => khamDoanService.getAllBNKhamDoan());
        yield put({
          type: typeAction.DISPATCH_LIST_ALL_BN_KHAM_DOAN,
          payload: result.data,
        });
        Toast.fire({
          icon: "success",
          title: "Thêm bệnh nhân thành công",
        });
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Thêm bệnh nhân thất bại",
        });
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
  // LIST CTY KHÁCH KHÁM ĐOÀN
  yield takeLatest(
    typeAction.POST_CTY_KHAM_DOAN,
    function* getAllCty({ type, payload }) {
      try {
        const now =moment()
        payload.ngaytao = now.format()
        yield call(() => khamDoanService.postCtyKhamDoan(payload));
        const result = yield call(() => khamDoanService.getAllCtyKhamDoan());
        yield put({
          type: typeAction.DISPATCH_ALL_CTY_KHAM_DOAN,
          payload: result.data,
        });
        Toast.fire({
          icon: "success",
          title: "Thêm Công ty thành công",
        });
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Thêm Công ty thất bại",
        });
      }
    }
  );
  // LẤY INFO CÔNG TY KHÁM ĐOÀN
  yield takeLatest(
    typeAction.GET_INFO_CTY_KHAM_DOAN,
    function* getInfoCty({ type, payload }) {
      try {
        const result = yield call(() =>
          khamDoanService.getCtyKhamDoanById(payload)
        );
        yield put({
          type: typeAction.DISPATCH_INFO_CTY_KHAM_DOAN,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
  // EDIT CÔNG TY KHÁM ĐOÀN
  yield takeLatest(
    typeAction.EDIT_CTY_KHAM_DOAN_BY_ID,
    function* editInfoCty({ type, id, form }) {
      try {
        const now = moment()
        form.ngaysua = now.format()
        yield call(() => khamDoanService.putCtyKhamDoanById(id, form));
        const result = yield call(() => khamDoanService.getAllCtyKhamDoan());
        yield put({
          type: typeAction.DISPATCH_ALL_CTY_KHAM_DOAN,
          payload: result.data,
        });
        Toast.fire({
          icon: "success",
          title: "Cập nhâp Công ty thành công",
        });
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Cập nhâp Công ty thất bại",
        });
      }
    }
  );
  // XOÁ BỆNH NHÂN KHÁM ĐOÀN
  yield takeLatest(
    typeAction.DELETE_BN_KHAM_DOAN_BY_ID,
    function* deleteBNKhamDoan({ type, id }) {
      try {
        yield call(() => khamDoanService.deleteBNKhamDoanById(id));
        yield put(getAllBNKhamDoan());
        Toast.fire({
          icon: "success",
          title: "Xoá bệnh nhân thành công",
        });
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Xoá bệnh nhân thất bại",

        });
      }
    }
  );
  // INFO BỆNH NHÂN KHÁM ĐOÀN
  yield takeLatest(
    typeAction.GET_INFO_BN_KHAM_DOAN,
    function* infoBNKhamDoan({ type, id }) {
      try {
        const result = yield call(() =>
          khamDoanService.getInfoBNKhamDoanById(id)
        );
        yield put({
          type: typeAction.DISPATCH_INFO_BN_KHAM_DOAN,
          payload: result.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
  // import danh sách
  yield takeLatest(
    typeAction.IMPORT_LIST_BN_KHAM_DOAN,
    function* importListKhamDoan({ type, payload }) {
      try {
        yield put({
          type:typeAction.OPEN_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        const now = new Date();
        const infoUser = JSON.parse(localStorage.getItem("USER_INFO"));
        const newData = yield payload.map((items) => ({
          tenbn: items.TENBN,
          gioitinh: items.GIOITINH,
          ngaysinh: moment(items.NGAYSINH, "DD/MM/YYYY").format(),
          sodienthoai: items.SODIENTHOAI,
          mact: items.MACT,
          ngaytao: moment(now).format(),
          nguoitao: infoUser.tenNV,
        }));
        yield call(() => khamDoanService.postBNKhamDoan(newData));
        yield put({
          type: typeAction.RESET_DATA_BN_IMPORT,
        });
        yield put(getAllBNKhamDoan());
        yield put({
          type:typeAction.CLOSE_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        Toast.fire({
          icon: "success",
          title: "Thêm bệnh nhân thành công",
        });
      } catch (err) {
        console.log(err);
        yield put({
          type:typeAction.CLOSE_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        Toast.fire({
          icon: "error",
          title: "Thêm bệnh nhân thất bại",
        });
      }
    }
  );
  // UPDATE THÔNG TIN BỆNH NHÂN
  yield takeLatest(
    typeAction.UPDATE_INFO_BN_KHAM_DOAN,
    function* updateInfoBNKhamDoan({ type, id, form }) {
      try {
        yield put({
          type:typeAction.OPEN_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        yield call(() => khamDoanService.postInfoBNKhamDoanById(id, form));
        yield put(getAllBNKhamDoan());
        yield put(getAllBNKhamDoan());
        yield put({
          type:typeAction.CLOSE_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        Toast.fire({
          icon: "success",
          title: "Cập nhập bệnh nhân thành công",
        });
      } catch (err) {
        console.log(err);
        yield put({
          type:typeAction.CLOSE_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        Toast.fire({
          icon: "error",
          title: "Cập nhập bệnh nhân thất bại",
        });
      }
    }
  );
    // DELETE CÔNG TY KHÁM DOÀN BY ID
    yield takeLatest(
      typeAction.DELETE_CTY_KHAM_DOAN,
      function* delteCtyKhamDoan({ type, id}) {
        try {
          yield call(() => khamDoanService.deleteCTyKhamDoan(id));
          yield put(getListCtyKhamDoan());
          Toast.fire({
            icon: "success",
            title: "Xoá công ty thành công thành công",
          });
        } catch (err) {
          console.log(err);
          Toast.fire({
            icon: "error",
            title: "Xoá công ty thất bại",
            text:'Công ty đã thêm nhân viên'
          });
        }
      }
    );
  // ADD LIST SMS
  yield takeLatest(
    typeAction.SEND_SMS_BN_KHAM_DOAN,
    function* sendSMSKhamDoan({ type, payload }) {
      try {
        yield put({
          type:typeAction.OPEN_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        for (let info of payload){
          // const lastName = info.TENBN.substring(TENBN.lastIndexOf(' ') + 1) // LẤY TÊN CỦA BỆNH NHÂN
          const sdt = info.SODIENTHOAI;
          const maBN = info.MABN;
          const message = `Tat ca cac xet nghiem cua ma ho so ${maBN} da hoan thanh. Xem chi tiet: benhandientu.ivyhealth.com`
          // console.log('sdt: ', sdt , 'message: ', message);
          yield call(() => khamDoanService.sendSMS(sdt,message));
        }
        yield put(getAllBNKhamDoan());
        yield put({
          type:typeAction.CLOSE_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        Toast.fire({
          icon: "success",
          title: "Hoàn tất gửi sms",
        });
      } catch (err) {
        console.log(err);
        yield put({
          type:typeAction.CLOSE_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        Toast.fire({
          icon: "error",
          title: "Gửi sms Thất bại",
        });
      }
    }
  );
  // SEARCH BỆNH NHÂN KHÁM ĐOÀN
  yield takeLatest(typeAction.SEARCH_BN_KHAM_DOAN,
    function* searchBN({type,keyword}){
      try{
        yield put({
          type:typeAction.OPEN_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        const result = yield call(()=> khamDoanService.searchBN(keyword));
        yield put({
          type: typeAction.DISPATCH_LIST_ALL_BN_KHAM_DOAN,
          payload: result.data,
        });
        yield put({
          type:typeAction.CLOSE_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
      }catch(error){
        yield put({
          type:typeAction.CLOSE_IS_LOADING_TABLE_BN_KHAM_DOAN
        })
        console.log(error);
      }
    }
  )
}
