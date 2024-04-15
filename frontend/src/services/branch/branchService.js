import axios from "axios";

//local
// const URL = 'http://localhost:5234/api/'
// server
const URL = 'http://14.241.244.112:5234/api/'
const https = axios.create({
    baseURL: URL
})
export const branchService = {
    getListBranch: () => https.get(`chinhanh`),
    getDefaultBranch: (username) => https.get(`ChiNhanh/user/${username}`),
    getbranchLogin: (id) => https.get(`ChiNhanh/GetChiNhanh/${id}`),
    getCaLamViet: () => https.get('calamviec'),
}