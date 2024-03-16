import { produce } from "immer";
import * as typeAction from "../constants/constants"
const initialState = {
  loadingPage: false,
};

const modalReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.OPEN_LOADING:
        draft.loadingPage = true;
        break;
      case typeAction.CLOSE_LOADING:
        draft.loadingPage = false;
        break;
      default:
        return state;
    }
  });
};

export default modalReducer;
