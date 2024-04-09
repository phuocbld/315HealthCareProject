import { get } from "lodash"
import { https } from "../apiService"

export const NhapKhoService = {
    getBranch: (id) => https.get(`ChiNhanh/${id}`),
    getListKhoNhap: (id) => https.get(`KhoChiNhanh/${id}`),
    getListDoiTac: () => https.get('DoiTac'),
    getInfoDoiTac: (idDoiTac) => https.get(`DoiTac/IdDoiTac/${idDoiTac}`),
    getAllThuocVT: () => https.get(`ThuocVatTu/all`),
    getInfoThuocVT: (idThuoc) =>https.get(`ThuocVatTu/${idThuoc}`),
    postPhieuNhap: (formData) => https.post('KhoNhapXuat/PhieuNhap',formData),
    postkhoChiTiet: (data) => https.post('khoChiTiet',data),
    getPhieuNhapKho: () => https.get('KhoNhapXuat/phieunhap'),
    deletePhieu: (idPhieu) => https.put(`KhoNhapXuat/Delete/${idPhieu}`),
    getInfoPTNhapKho: (idNhapXuat) => https.get(`KhoNhapXuat/${idNhapXuat}`),

}
