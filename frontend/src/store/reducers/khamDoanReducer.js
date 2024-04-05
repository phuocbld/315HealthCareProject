import { produce } from "immer";
import * as typeAction from "../constants/constants";
const initialState = {
  listBNImport: null,
};

const khamDoanReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.IMPORT_DATA_KHAM_DOAN:
        draft.listBNImport = payload;
        break;
      default:
        return state;
    }
  });
};

export default khamDoanReducer;