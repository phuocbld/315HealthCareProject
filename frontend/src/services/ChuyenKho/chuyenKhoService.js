import { https } from "../apiService"

export const chuyenKhoService = {
    getlistKhoNhan: (id) => https.get(`KhoChiNhanh/${id}`),
    postChuyenKho: (form) => https.post(`KhoNhapXuat/PhieuXuat`,form)
}