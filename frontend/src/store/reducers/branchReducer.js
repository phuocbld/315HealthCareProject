import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  listBranch: null,
};

const branchReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.DISPATCH_LIST_BRANCH:
        draft.listBranch = payload;
        break;
      default:
        return state;
    }
  });
};

export default branchReducer;
