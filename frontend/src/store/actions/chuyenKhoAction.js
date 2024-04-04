import * as typeAction from "../constants/constants";

export const getListKhoNhanAction = (id) => ({
  type: typeAction.GET_LIST_Ck_KHO_NHAN,
  payload:id
});

export const getKhoVTAction = (idThuoc) => ({
    type: typeAction.GET_CK_KHOVT,
    payload:idThuoc
  });
  export const postPhieuCKAction = (form,khoVT) => ({
    type: typeAction.POST_PHIEU_CK,
    payload:form,
    khoVT
  });

