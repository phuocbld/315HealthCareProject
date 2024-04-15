import { https } from "../apiService"

export const chuyenKhoService = {
    getlistKhoNhan: (id) => https.get(`KhoChiNhanh/${id}`),
    postChuyenKho: (form) => https.post(`KhoNhapXuat/PhieuXuat`,form),
    getChuyenKhoFilter: (filter) => https.get("KhoNhapXuat/FindPhieuXuatByCondition", {
        params: {
          fromDate: filter.since,
          toDate: filter.toDate,
          idChiNhanh: filter.idChiNhanh,
        },
      }),
}