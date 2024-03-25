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

export function* receiveSaga() {
    // LẤY TẤT CẢ DANH MỤC SELECT TIẾP NHẬN
  yield takeLatest(
    typeAction.GET_ALL_SELECT_CLINIC,
    function* ListBranch({ type, payload }) {
      try {
        const NguonKH = yield call(() => recieveService.getNguonKH());
        const PhongKham = yield call(() => recieveService.getPhongKham());
        const NgheNghiep = yield call(() => recieveService.getNgheNghiep());
        const HinhThucTT = yield call(()=>recieveService.getHinhThucTT());
        const DanToc = yield call(()=> recieveService.getDanToc());
        const DoiTuong = yield call(()=> recieveService.getDoiTuong());
        const TinhTP = yield call(()=> recieveService.getTinhTP());
        const QuocTich = yield call(()=> recieveService.getQuocTich());
        yield put({
          type: typeAction.DISPATCH_NGUON_KH,
          payload: NguonKH.data,
        });
        yield put({
            type: typeAction.DISPATCH_PHONG_KHAM,
            payload: PhongKham.data,
          });
          yield put({
            type: typeAction.DISPATCH_NGHE_NGHIEP,
            payload: NgheNghiep.data,
          });
          yield put({
            type: typeAction.DISPATCH_HINH_THUC_TT,
            payload: HinhThucTT.data,
          });
          yield put({
            type: typeAction.DISPATCH_DAN_TOC,
            payload: DanToc.data,
          });
          yield put({
            type: typeAction.DISPATCH_DOI_TUONG,
            payload: DoiTuong.data,
          });
          yield put({
            type: typeAction.DISPATCH_TINH_TP,
            payload: TinhTP.data,
          });
          yield put({
            type: typeAction.DISPATCH_QUOC_TICH,
            payload: QuocTich.data,
          })
      } catch (err) {
        yield console.log(err);
      }
    }
  );
    //lấy dữ liệu Quận
  yield takeLatest(typeAction.GET_QUAN_API,function* listQuan({type,payload}){

    try{
        const  result = yield call(() => recieveService.getQuanHuyen(payload))
        yield put({
            type: typeAction.DISPATCH_QUAN_HUYEN,
            payload:result.data
        })
    } catch(err){
       yield console.log(err);
    }
   
} );
    //lấy dữ liệu Quận
    yield takeLatest(typeAction.GET_QUAN_API,function* listXaPhuong({type,payload}){

        try{
            const  result = yield call(() => recieveService.getPhuongXa(payload))
            yield put({
                type: typeAction.DISPATCH_PHUONG_XA,
                payload:result.data
            })
        } catch(err){
           yield console.log(err);
        }
       
    } );
}
