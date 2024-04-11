import { produce } from "immer";
import * as typeAction from "../constants/constants";
import { formatNumberVND } from "../../utils/formatNumberVND";
const initialState = {
  branch: null,
  listKhoNhap: null,
  defaultKhoNhap: undefined,
  listDoiTac: null,
  infoDoiTac: null,
  thuocVT: null,
  infoThuocVT: [],
  listPhieuNhap: null,
  infoPTNhap: null,
  isLoading: false,
};

const NhapKhoReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case typeAction.DISPATCH_BRANCH_NHAPKHO:
        draft.branch = payload;
        break;
      case typeAction.DISPATCH_LIST_KHONHAP:
        draft.listKhoNhap = payload;
        break;
      case typeAction.DISPATCH_DEFAULT_KHONHAP:
        draft.defaultKhoNhap = payload;
        break;
      case typeAction.DISPATCH_LIST_DOITAC:
        draft.listDoiTac = payload;
        break;
      case typeAction.DISPATCH_INFO_DOITAC:
        draft.infoDoiTac = payload;
        break;
      case typeAction.DISPATCH_RESET_INFO_DOITAC:
        draft.infoDoiTac = null;
        break;
      case typeAction.DISPATCH_ALL_THUOCVT:
        draft.thuocVT = payload;
        break;
      case typeAction.DISPATCH_LIST_INFO_THUOCVT:
        draft.infoThuocVT.push(payload); // thêm info thuốc và vật tư vào mảng
        break;
      case typeAction.DELETE_INFO_THUOCVT_BY_ID:
        // tìm ID thuốc trong mãng và xoá nó ra khỏi mãng
        for (let i = 0; i < draft.infoThuocVT.length; i++) {
          if (draft.infoThuocVT[i].IDTHUOC === payload) {
            draft.infoThuocVT.splice(i, 1);
            return;
          }
        }
        break;
      case typeAction.EDIT_INFO_SL_THUOCVT_BY_ID:
        for (let i of draft.infoThuocVT) {
          if (i.IDTHUOC === payload.idThuoc) {
            // cập nhập lại số lượng trong infoThuoc Theo ID
            i.khoChiTiet.soLuong = payload.value;
            i.khoChiTiet.tienVAT = Number(
              (i.khoChiTiet.ptVAT * (i.khoChiTiet.soLuong * i.GIABAN)).toFixed(
                0
              )
            );
            i.khoChiTiet.ckTruocVat =
              (i.khoChiTiet.ptckTruocVat / 100) *
              (i.khoChiTiet.soLuong * i.khoChiTiet.donGiaMua);
            i.khoChiTiet.thanhTien =
              i.khoChiTiet.soLuong * i.GIABAN +
              i.khoChiTiet.tienVAT -
              i.khoChiTiet.ckTruocVat;
            //THỰC TRẢ
            i.khoChiTiet.thucTra =
              i.khoChiTiet.soLuong * i.GIABAN +
              i.khoChiTiet.tienVAT -
              i.khoChiTiet.ckTruocVat;
          }
        }
        break;
      case typeAction.EDIT_PHI_VAN_CHUYEN_BY_ID:
        for (let i of draft.infoThuocVT) {
          if (i.IDTHUOC === payload.idThuoc) {
            i.khoChiTiet.phiVanChuyen = payload.value;
          }
        }
        break;
      case typeAction.EDIT_PHI_GIA_CONG_BY_ID:
        for (let i of draft.infoThuocVT) {
          if (i.IDTHUOC === payload.idThuoc) {
            i.khoChiTiet.phiGiaCong = payload.value;
          }
        }
        break;
      case typeAction.EDIT_TIEN_CK_VAT_BY_ID:
        for (let i of draft.infoThuocVT) {
          if (i.IDTHUOC === payload.idThuoc) {
            i.khoChiTiet.ckTruocVat = payload.value;
            i.khoChiTiet.ptckTruocVat =
              (payload.value * 100) /
              (i.khoChiTiet.soLuong * i.khoChiTiet.donGiaMua);
          }
        }
        break;
      case typeAction.EDIT_PT_CK_VAT_BY_ID:
        for (let i of draft.infoThuocVT) {
          if (i.IDTHUOC === payload.idThuoc) {
            i.khoChiTiet.ptckTruocVat = payload.value;
            i.khoChiTiet.ckTruocVat =
              (payload.value / 100) *
              (i.khoChiTiet.soLuong * i.khoChiTiet.donGiaMua);
            //THÀNH TIỀN
            i.khoChiTiet.thanhTien =
              i.khoChiTiet.soLuong * i.GIABAN +
              i.khoChiTiet.tienVAT -
              i.khoChiTiet.ckTruocVat;
            //THỰC TRẢ
            i.khoChiTiet.thucTra =
              i.khoChiTiet.soLuong * i.GIABAN +
              i.khoChiTiet.tienVAT -
              i.khoChiTiet.ckTruocVat;
          }
        }
        break;
      case typeAction.DISPATCH_VAT_THUOCVT:
        for (let i of draft.infoThuocVT) {
          if (i.IDTHUOC === payload.idThuoc) {
            if (payload.value === 0.05) {
              i.khoChiTiet.vat5 = Number(
                (i.khoChiTiet.soLuong * i.khoChiTiet.donGiaMua * 0.05).toFixed(
                  0
                )
              );
              i.khoChiTiet.tienVAT = Number(
                (i.khoChiTiet.soLuong * i.khoChiTiet.donGiaMua * 0.05).toFixed(
                  0
                )
              );
              i.khoChiTiet.ptVAT = 0.05;
              i.khoChiTiet.vat8 = 0;
              i.khoChiTiet.vat10 = 0;
              i.khoChiTiet.thanhTien =
                i.khoChiTiet.soLuong * i.GIABAN +
                i.khoChiTiet.tienVAT -
                i.khoChiTiet.ckTruocVat;
              //THỰC TRẢ
              i.khoChiTiet.thucTra =
                i.khoChiTiet.soLuong * i.GIABAN +
                i.khoChiTiet.tienVAT -
                i.khoChiTiet.ckTruocVat;
            }
            if (payload.value === 0.08) {
              i.khoChiTiet.vat8 = Number(
                (i.khoChiTiet.soLuong * i.khoChiTiet.donGiaMua * 0.08).toFixed(
                  0
                )
              );
              i.khoChiTiet.tienVAT = Number(
                (i.khoChiTiet.soLuong * i.khoChiTiet.donGiaMua * 0.08).toFixed(
                  0
                )
              );
              i.khoChiTiet.ptVAT = 0.08;
              i.khoChiTiet.vat5 = 0;
              i.khoChiTiet.vat10 = 0;
              i.khoChiTiet.thanhTien =
                i.khoChiTiet.soLuong * i.GIABAN +
                i.khoChiTiet.tienVAT -
                i.khoChiTiet.ckTruocVat;
              //THỰC TRẢ
              i.khoChiTiet.thucTra =
                i.khoChiTiet.soLuong * i.GIABAN +
                i.khoChiTiet.tienVAT -
                i.khoChiTiet.ckTruocVat;
            }
            if (payload.value === 0.1) {
              Number(
                (i.khoChiTiet.soLuong * i.khoChiTiet.donGiaMua * 0.1).toFixed(0)
              );
              i.khoChiTiet.tienVAT = Number(
                (i.khoChiTiet.soLuong * i.khoChiTiet.donGiaMua * 0.1).toFixed(0)
              );
              i.khoChiTiet.vat5 = 0;
              i.khoChiTiet.vat8 = 0;
              i.khoChiTiet.ptVAT = 0.1;
              i.khoChiTiet.thanhTien =
                i.khoChiTiet.soLuong * i.GIABAN +
                i.khoChiTiet.tienVAT -
                i.khoChiTiet.ckTruocVat;
              //THỰC TRẢ
              i.khoChiTiet.thucTra =
                i.khoChiTiet.soLuong * i.GIABAN +
                i.khoChiTiet.tienVAT -
                i.khoChiTiet.ckTruocVat;
            }
          }
        }

        break;
      case typeAction.DISPATCH_SOLO_THUOCVT:
        for (let i of draft.infoThuocVT) {
          if (i.IDTHUOC === payload.idThuoc) {
            i.khoChiTiet.soLo = payload.value;
          }
        }
        break;
      case typeAction.DISPATCH_HANDUNG_THUOCVT:
        for (let i of draft.infoThuocVT) {
          if (i.IDTHUOC === payload.idThuoc) {
            i.khoChiTiet.hanDung = payload.date;
          }
        }
        break;
      case typeAction.RESET_INFO_THUOVT:
        draft.infoThuocVT = [];
        break;
      case typeAction.DISPATCH_LIST_PHIEU_NHAP:
        draft.listPhieuNhap = payload;
        break;
      case typeAction.DISPATCH_INFO_PT_NHAP_KHO:
        draft.infoPTNhap = payload;
        break;
      case typeAction.OPEN_LOADING_TABLE_NHAP_KHO:
        draft.isLoading = true;
        break;
      case typeAction.CLOSE_LOADING_TABLE_NHAP_KHO:
        draft.isLoading = false;
        break;
      default:
        return state;
    }
  });
};

export default NhapKhoReducer;
