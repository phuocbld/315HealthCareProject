import { https } from "../apiService"

export const khamDoanService = {
    getAllBNKhamDoan: () => https.get('CongTyBenhNhan'),
    postBNKhamDoan: (form) => https.post('CongTyBenhNhan',form),
    getAllCtyKhamDoan: () => https.get('CongTyKhachKhamDoan'),
}