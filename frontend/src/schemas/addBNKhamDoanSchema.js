import * as Yup from "yup";
const phoneNumber = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
export const addBNKhamDoanSchema = Yup.object().shape({
    tenbn: Yup.string().required(),
    gioitinh: Yup.string().required(),
    ngaysinh: Yup.string().required(),
    mact: Yup.string().required(),
    sodienthoai: Yup.string().matches(phoneNumber,'* Số điện thoại không hợp lệ !'),
    // website: Yup.string().required(),
});