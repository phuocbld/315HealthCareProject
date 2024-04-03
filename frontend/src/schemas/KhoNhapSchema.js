import * as Yup from "yup";

export const KhoNhapSchema = Yup.object().shape({
  idKhoNhap: Yup.string().required(),
  idDoiTac: Yup.string().required(),
  soHoaDon: Yup.string().required(),
  ngayHoaDon: Yup.string().required(),
  idPhuongThuc: Yup.string().required(),
  idHinhThuc: Yup.string().required(),
  tenPhieu: Yup.string().required(),
  NoiDung: Yup.string().required(),
});
