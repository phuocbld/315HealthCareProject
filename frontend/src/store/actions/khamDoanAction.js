import * as typeAction from "../constants/constants";

export const getAllBNKhamDoan = () => ({
  type: typeAction.GET_ALL_BN_KHAM_DOAN,
});
export const postBNKhamDoan = (payload) => ({
  type: typeAction.POST_BN_KHAM_DOAN,
  payload
});

export const getListCtyKhamDoan = () => ({
  type: typeAction.GET_ALL_LIST_CTY,
});
export const addCtyKhamDoan = (form) => ({
  type: typeAction.POST_CTY_KHAM_DOAN,
  payload: form,
});
export const getCtyKhamDoanById = (id) => ({
  type: typeAction.GET_INFO_CTY_KHAM_DOAN,
  payload: id,
});
export const editCtyKhamDoanById = (id, form) => ({
  type: typeAction.EDIT_CTY_KHAM_DOAN_BY_ID,
  id,
  form,
});
export const deleteBNKhamDoanById = (id) => ({
  type: typeAction.DELETE_BN_KHAM_DOAN_BY_ID,
  id,
});
export const importListBNKhamDoan = (payload) => ({
  type: typeAction.IMPORT_LIST_BN_KHAM_DOAN,
  payload,
});
export const infoBNKhamDoanAction = (id) => ({
  type: typeAction.GET_INFO_BN_KHAM_DOAN,
  id,
});
export const UpdateBNKhamDoanAction = (id,form) => ({
  type: typeAction.UPDATE_INFO_BN_KHAM_DOAN,
  id,
  form
});
export const sendSMSKhamDoanAction = (payload) => ({
  type: typeAction.SEND_SMS_BN_KHAM_DOAN,
  payload
});
export const deleteCtykhamDoan = (id) => ({
  type: typeAction.DELETE_CTY_KHAM_DOAN,
  id
});