import * as Yup from "yup";

export const addBNKhamDoanSchema = Yup.object().shape({
    tenbn: Yup.string().required(),
    gioitinh: Yup.string().required(),
    ngaysinh: Yup.string().required(),
    idct: Yup.string().required(),
    sodienthoai: Yup.string().required(),
    // website: Yup.string().required(),
});