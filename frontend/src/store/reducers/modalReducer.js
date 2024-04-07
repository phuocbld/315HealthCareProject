import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  loadingPage: false,
  modalMoCa: false,
  modalAddKhamDoan: false,
  modalAddCtyKhamDoan: false,
  modalEditCtyKhamDoan: false,
  modalImportKhamDoan: false,
  modalEditBNKhamDoan:false,
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
      case typeAction.OPEN_ADD_CTY_KHAM_DOAN:
        draft.modalAddCtyKhamDoan = true;
        break;
      case typeAction.CLOSE_ADD_CTY_KHAM_DOAN:
        draft.modalAddCtyKhamDoan = false;
        break;
      case typeAction.OPEN_MODAL_EDIT_CTY_KHAM_DOAN:
        draft.modalEditCtyKhamDoan = true;
        break;
      case typeAction.CLOSE_MODAL_EDIT_CTY_KHAM_DOAN:
        draft.modalEditCtyKhamDoan = false;
        break;
      case typeAction.OPEN_MODAL_IMPORT_KHAM_DOAN:
        draft.modalImportKhamDoan = true;
        break;
      case typeAction.CLOSE_MODAL_IMPORT_KHAM_DOAN:
        draft.modalImportKhamDoan = false;
        break;
        case typeAction.OPEN_MODAL_EDIT_BN_KHAM_DOAN:
          draft.modalEditBNKhamDoan = true;
          break;
        case typeAction.CLOSE_MODAL_EDIT_BN_KHAM_DOAN:
          draft.modalEditBNKhamDoan = false;
          break;
      default:
        return state;
    }
  });
};

export default modalReducer;
