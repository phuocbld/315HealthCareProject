import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  branch: null,
};

const NhapKhoReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.DISPATCH_BRANCH_NHAPKHO:
        draft.branch = payload;
        break;
      default:
        return state;
    }
  });
};

export default NhapKhoReducer;
