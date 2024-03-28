import axios from "axios";

//local
// const URL = 'http://localhost:5234/api/'
// server
const URL = 'http://14.241.244.112:5234/api/'
const https = axios.create({
    baseURL: URL
})
export const recieveService = {
   getNguonKH: () => https.get('NguonKH'),
   getPhongKham: () => https.get('PhongKham'),
   getNgheNghiep: () => https.get('NgheNghiep'),
   getHinhThucTT: () => https.get('HinhThucTT'),
   getDanToc: () => https.get('DanToc'),
   getDoiTuong: () => https.get('DoiTuong'),
   getTinhTP: () => https.get('tinh'),
   getQuocTich: () => https.get('QuocTich'),
   getPhuongXa: (idQuan) => https.get(`PhuongXa/${idQuan}`),
   getQuanHuyen: (idTinh)=> https.get(`QuanHuyen/${idTinh}`)
}