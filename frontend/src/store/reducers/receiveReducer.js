import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  nguonKH: null,
  phongKham: null,
  ngheNghiep: null,
  hinhThucTT: null,
  danToc: null,
  doiTuong: null,
  tinhTP: null,
  quocTich: null,
  phuongXa: null,
  quanHuyen: null,
};

const receiveReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.DISPATCH_NGUON_KH:
        draft.nguonKH = payload;
        break;
      case typeAction.DISPATCH_PHONG_KHAM:
        draft.phongKham = payload;
        break;
      case typeAction.DISPATCH_NGHE_NGHIEP:
        draft.ngheNghiep = payload;
        break;
      case typeAction.DISPATCH_HINH_THUC_TT:
        draft.hinhThucTT = payload;
        break;
      case typeAction.DISPATCH_DAN_TOC:
        draft.danToc = payload;
        break;
      case typeAction.DISPATCH_DOI_TUONG:
        draft.doiTuong = payload;
        break;
      case typeAction.DISPATCH_TINH_TP:
        draft.tinhTP = payload;
        break;
      case typeAction.DISPATCH_QUOC_TICH:
        draft.quocTich = payload;
        break;
      case typeAction.DISPATCH_PHUONG_XA:
        draft.phuongXa = payload;
        break;
      case typeAction.DISPATCH_QUAN_HUYEN:
        draft.quanHuyen = payload;
        break;
      default:
        return state;
    }
  });
};

export default receiveReducer;
