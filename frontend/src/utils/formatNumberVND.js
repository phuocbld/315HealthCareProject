
// theo sau giá 3 số 0
export const formatNumberVND = (value) => {
const formatter = new Intl.NumberFormat("vi-VN",{ minimumFractionDigits:3}).format(value);
  return formatter;
};

