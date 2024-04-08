import { https } from "../apiService"

export const khamDoanService = {
    getAllBNKhamDoan: () => https.get('AllBenhNhan'),
    postBNKhamDoan: (form) => https.post('AddBenhNhan',form),
    getAllCtyKhamDoan: () => https.get('CongTyKhachKhamDoan'),
    postCtyKhamDoan: (form) => https.post('CongTyKhachKhamDoan',form),
    getCtyKhamDoanById: (id) => https.get(`CongTyKhachKhamDoan/${id}`),
    putCtyKhamDoanById: (id,form) => https.put(`CongTyKhachKhamDoan/${id}`,form),
    deleteBNKhamDoanById: (id) => https.delete(`DeleteBenhNhan/${id}`),
    getInfoBNKhamDoanById: (id) => https.get(`FindByID/${id}`),
    postInfoBNKhamDoanById: (id,form) => https.put(`/UpdateBenhNhan/${id}`,form),
    sendSMS:(sdt,message) => https.post(`Sms/Send?phoneNumber=${sdt}&message=${message}`),
    deleteCTyKhamDoan: (id) => https.delete(`CongTyKhachKhamDoan/${id}`),
    searchBN: (keyword)=> https.get(`Search?keyword=${keyword}`)
}