import * as typeAction from "../constants/constants";
export const demoModalCAction = (value) => ({
  type: "DEMO_MODAL",
  payload: value,
});

export const listBranchAction = () => ({
  type: typeAction.GET_LIST_BRANCH_API,
});
