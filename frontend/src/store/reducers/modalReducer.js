import { produce } from "immer";
import * as typeAction from "../constants/constants"
const initialState = {
  loadingPage: false,
  modalMoCa:false,
  modalAddKhamDoan:false
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
        case typeAction.OPEN_ADD_KHAM_DOAN:
        draft.modalAddKhamDoan = true;
        break;
        case typeAction.CLOSE_ADD_KHAM_DOAN:
        draft.modalAddKhamDoan = false;
        break;
      default:
        return state;
    }
  });
};

export default modalReducer;
