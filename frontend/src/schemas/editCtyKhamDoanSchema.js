import * as Yup from "yup";
const phoneNumber = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
export const editCtyKhamDoanSchema = Yup.object().shape({
    tenct: Yup.string().required(),
    diachi: Yup.string().required(),
    dienthoai: Yup.string().required().matches(phoneNumber,'* Số điện thoại không hợp lệ !'),
    // fax: Yup.string().required(),
    // email: Yup.string().required(),
    // website: Yup.string().required(),
});