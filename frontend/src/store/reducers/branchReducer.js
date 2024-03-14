import { produce } from "immer";

const initialState = {
  data: [],
  modal: false,
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
      default:
        return state;
    }
  });
};

export default branchReducer;
