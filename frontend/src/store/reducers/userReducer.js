import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  infoUser: null,
  username: null,
  idDefaultChiNhanh: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.DISPATCH_INFO_LOGIN:
        draft.infoUser = payload;
        break;
      case typeAction.DISPATCH_USERNAME:
        draft.username = payload;
        break;
      case typeAction.DISPATCH_DEFAULT_BRANCH:
        draft.idDefaultChiNhanh = payload;
        break;
      default:
        return state;
    }
  });
};

export default userReducer;
