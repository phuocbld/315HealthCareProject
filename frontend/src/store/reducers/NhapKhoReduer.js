import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  branch: null,
  listKhoNhap: null,
  defaultKhoNhap: undefined,
  listDoiTac: null,
  infoDoiTac: null,
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
      default:
        return state;
    }
  });
};

export default NhapKhoReducer;
