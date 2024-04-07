import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  listBNImport: null,
  ListBNKhamDoan: null,
  listCTy: null,
  infoCtyKhamDoan: null,
  infoBNKhamDoan: null,
};

const khamDoanReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.IMPORT_DATA_KHAM_DOAN:
        draft.listBNImport = payload;
        break;
      case typeAction.DISPATCH_LIST_ALL_BN_KHAM_DOAN:
        draft.ListBNKhamDoan = payload;
        break;
      case typeAction.DISPATCH_ALL_CTY_KHAM_DOAN:
        draft.listCTy = payload;
        break;
      case typeAction.DISPATCH_INFO_CTY_KHAM_DOAN:
        draft.infoCtyKhamDoan = payload;
        break;
      case typeAction.RESET_DATA_BN_IMPORT:
        draft.infoCtyKhamDoan = null;
        break;
      case typeAction.DISPATCH_INFO_BN_KHAM_DOAN:
        draft.infoBNKhamDoan = payload;
        break;
      default:
        return state;
    }
  });
};

export default khamDoanReducer;
