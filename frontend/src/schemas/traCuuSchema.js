import *  as  Yup from 'yup';

export const traCuuSchema = Yup.object().shape({
    maBN: Yup
    .string()
    .required('* nhập mã bệnh nhân'),
})