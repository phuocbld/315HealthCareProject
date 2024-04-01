import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  branch: null,
  listKhoNhap: null,
  defaultKhoNhap: undefined,
  listDoiTac: null,
  infoDoiTac: null,
  thuocVT: null,
  infoThuocVT: [],
};

const NhapKhoReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.DISPATCH_BRANCH_NHAPKHO:
        draft.branch = payload;
        break;
      case typeAction.DISPATCH_LIST_KHONHAP:
        draft.listKhoNhap = payload;
        break;
      case typeAction.DISPATCH_DEFAULT_KHONHAP:
        draft.defaultKhoNhap = payload;
        break;
      case typeAction.DISPATCH_LIST_DOITAC:
        draft.listDoiTac = payload;
        break;
      case typeAction.DISPATCH_INFO_DOITAC:
        draft.infoDoiTac = payload;
        break;
      case typeAction.DISPATCH_RESET_INFO_DOITAC:
        draft.infoDoiTac = null;
        break;
      case typeAction.DISPATCH_ALL_THUOCVT:
        draft.thuocVT = payload;
        break;
      case typeAction.DISPATCH_LIST_INFO_THUOCVT:
        draft.infoThuocVT.push(payload); // thêm info thuốc và vật tư vào mảng
        break;
      case typeAction.DELETE_INFO_THUOCVT_BY_ID:
        // tìm ID thuốc trong mãng và xoá nó ra khỏi mãng
        for(let i = 0; i < draft.infoThuocVT.length;i++){
          if(draft.infoThuocVT[i].IDTHUOC === payload){
            draft.infoThuocVT.splice(i,1)
            return;
          }
        }
        break;
      default:
        return state;
    }
  });
};

export default NhapKhoReducer;
