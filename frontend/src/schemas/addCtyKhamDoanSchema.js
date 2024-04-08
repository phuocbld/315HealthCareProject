import * as Yup from "yup";

export const addCtyKhamDoanSchema = Yup.object().shape({
    tenct: Yup.string().required(),
    diachi: Yup.string().required(),
    dienthoai: Yup.string().required(),
    fax: Yup.string().required(),
    email: Yup.string().required(),
    // mact: Yup.string().required(),
    // website: Yup.string().required(),
});