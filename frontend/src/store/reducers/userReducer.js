import { produce } from "immer";
import * as typeAction from "../constants/constants"
const initialState = {
  infoUser: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.DISPATCH_INFO_LOGIN:
        draft.infoUser = payload;
        break;

      default:
        return state;
    }
  });
};

export default userReducer;