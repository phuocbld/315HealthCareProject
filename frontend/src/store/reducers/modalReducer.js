import { produce } from "immer";
import * as typeAction from "../constants/constants"
const initialState = {
  loadingPage: false,
  modalMoCa:true
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
        case typeAction.OPEN_MODAL_MOCA:
        draft.modalMoCa = true;
        break;
        case typeAction.CLOSE_MODAL_MOCA:
        draft.modalMoCa = false;
        break;
      default:
        return state;
    }
  });
};

export default modalReducer;
