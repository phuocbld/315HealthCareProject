import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  KhoNhan: null,
  KhoVT: [],
};

const chuyenKhoReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.DISPATCH_Ck_KHO_NHAN:
        draft.KhoNhan = payload;
        break;
      case typeAction.DISPATCH_CK_KHOVT:
        draft.KhoVT.push(payload);
        break;
      case typeAction.CHANGE_SL_THUOC_CK:
        for (let items of draft.KhoVT) {
          if (payload.idThuoc === items.IDTHUOC) {
            items.khoChiTiet.soLuong = payload.value;
            return;
          }
        }
        break;
      case typeAction.CLOSE_THUOC_CK_BY_ID:
        for (let index in draft.KhoVT) {
          if (draft.KhoVT[index].IDTHUOC === payload) {
            draft.KhoVT.splice(index, 1);
            return;
          }
        }
        break;
      case typeAction.RESET_KHOVT_CK:
        draft.KhoVT = [];
        break;
      default:
        return state;
    }
  });
};

export default chuyenKhoReducer;
