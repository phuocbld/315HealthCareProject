import * as Yup from "yup";

export const editingBNKhamDoanSchema = Yup.object().shape({
    tenbn: Yup.string().required(),
    sodienthoai: Yup.string().required(),
});