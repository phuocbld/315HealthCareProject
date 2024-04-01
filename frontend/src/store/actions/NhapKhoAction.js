import * as typeAction from "../constants/constants";

export const getBranchNhapKho = () => ({
    type:typeAction.GET_BRANCH_NHAPKHO
})

export const getlistDoitac = () => ({
    type:typeAction.GET_LIST_DOITAC,
})
export const getInfoDoitac = (payload) => ({
    type:typeAction.GET_INFO_DOITCA,
    payload
})

export const fetchAllThuocVT = () => ({
    type:typeAction.GET_ALL_THUOCVT
})
export const fetchInfoThuocVT = (idThuoc) => ({
    type:typeAction.GET_INFO_THUOCVT,
    payload:idThuoc
})