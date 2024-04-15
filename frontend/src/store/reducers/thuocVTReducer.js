import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  listThuocVT: null,
};

const thuocVTReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.DISPATCH_LIST_THUOCVT:
        draft.listThuocVT = payload;
        break;
      default:
        return state;
    }
  });
};

export default thuocVTReducer;
