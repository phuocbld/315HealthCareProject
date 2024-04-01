import { https } from "../apiService"

export const NhapKhoService = {
    getBranch: (id) => https.get(`ChiNhanh/${id}`),
    getListKhoNhap: (id) => https.get(`KhoChiNhanh/${id}`),
    getListDoiTac: () => https.get('DoiTac'),
    getInfoDoiTac: (idDoiTac) => https.get(`DoiTac/IdDoiTac/${idDoiTac}`),
    getAllThuocVT: () => https.get(`ThuocVatTu`),
    getInfoThuocVT: (idThuoc) =>https.get(`ThuocVatTu/${idThuoc}`)
}
