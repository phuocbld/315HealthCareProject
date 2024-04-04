import * as Yup from "yup";

export const chuyenKhoSchema = Yup.object().shape({
  idKhoXuat: Yup.string().required(),
  idKhoNhap: Yup.string().required(),
  tenPhieu: Yup.string().required(),
  noiDung: Yup.string().required()
});
