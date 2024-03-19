import * as typeAction from "../constants/constants";
export const demoModalCAction = (value) => ({
  type: "DEMO_MODAL",
  payload: value,
});

export const listBranchAction = () => ({
  type: typeAction.DISPATCH_LIST_BRANCH,
});
