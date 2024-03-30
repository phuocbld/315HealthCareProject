import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  branch: null,
  listKhoNhap: null,
  defaultKhoNhap: undefined,
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
      default:
        return state;
    }
  });
};

export default NhapKhoReducer;
