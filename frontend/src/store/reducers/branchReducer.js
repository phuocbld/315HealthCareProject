import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  listBranch: null,
  PkDangNhap: null,
  listCa: null,
};

const branchReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.DISPATCH_LIST_BRANCH:
        draft.listBranch = payload;
        break;
      case typeAction.DISPATCH_BRANCH_LOGIN:
        draft.PkDangNhap = payload;
        break;
        case typeAction.DISPATCH_lIST_CALAMVIEC:
          draft.listCa = payload;
          break;
      default:
        return state;
    }
  });
};

export default branchReducer;
