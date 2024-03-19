import *  as  Yup from 'yup';

export const loginSchema = Yup.object().shape({
    username: Yup
    .string()
    .required('Vui lòng nhập tài khoản của bạn'),
    password: Yup
    .string()
    .required("Vui lòng nhập mật khẩu"),
    idChiNhanh: Yup
    .string()
    .required('Vui lòng chọn phòng khám'),

})