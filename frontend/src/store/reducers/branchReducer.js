import { produce } from "immer";
import *  as  typeAction  from '../constants/constants'
const initialState = {
  data: [],
  modal: false,
  listBranch:null
};

const branchReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case "FETCH_DATA_BRANCH":
        draft.modal = true;
        break;
      case "TRUE_MODAL":
        draft.modal = true;
        break;
        case typeAction.DISPATCH_LIST_BRANCH:
        draft.listBranch = payload;
        break;
      default:
        return state;
    }
  });
};

export default branchReducer;
