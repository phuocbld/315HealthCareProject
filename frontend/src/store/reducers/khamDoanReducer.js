import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  listBNImport: null,
  ListBNKhamDoan:null,
  listCTy:null
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
      default:
        return state;
    }
  });
};

export default khamDoanReducer;