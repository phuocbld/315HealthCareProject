import { https } from "../apiService";

export const khoVTservice = {
    getAllVT: () => https.get('/ThuocVatTu/AllThuoc')
}