import * as Yup from "yup";

export const chuyenKhoSchema = Yup.object().shape({
    tenct: Yup.string().required(),
    diachi: Yup.string().required(),
    dienthoai: Yup.string().required(),
    fax: Yup.string().required(),
    email: Yup.string().required(),
    // website: Yup.string().required(),
});