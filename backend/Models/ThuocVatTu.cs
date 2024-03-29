namespace _315HealthCareProject.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("THUOCVATTU")]
    public class ThuocVatTu
    {
        [Key]
        [Column("IDTHUOC")]
        public int IdThuoc { get; set; }

        [Column("MATHUOC")]
        public string MaThuoc { get; set; }

        [Column("TENBIETDUOC")]
        public string TenBietDuoc { get; set; }

        [Column("TENHOATCHAT")]
        public string TenHoatChat { get; set; }

        [Column("DVT")]
        public string DonViTinh { get; set; }

        [Column("QUYCACH")]
        public string QuyCach { get; set; }

        [Column("NONGDO")]
        public string NongDo { get; set; }

        [Column("HAMLUONG")]
        public string HamLuong { get; set; }

        [Column("DUONGDUNG")]
        public string DuongDung { get; set; }

        [Column("NUOCSANXUAT")]
        public string NuocSanXuat { get; set; }

        [Column("NHASANXUAT")]
        public string NhaSanXuat { get; set; }

        [Column("SUDUNG")]
        public int SuDung { get; set; }

        [Column("GHICHU")]
        public string GhiChu { get; set; }

        [Column("IDCT")]
        public int IdCT { get; set; }

        [Column("DONGIA")]
        public decimal DonGia { get; set; }

        [Column("BARCODE")]
        public string Barcode { get; set; }

        [Column("QRCODE")]
        public string QRCode { get; set; }

        [Column("CACHDUNG")]
        public string CachDung { get; set; }

        [Column("MASODANGKY")]
        public string MaSoDangKy { get; set; }

        [Column("DONVICHAN")]
        public string DonViChan { get; set; }

        [Column("CHUYENKHOA")]
        public string ChuyenKhoa { get; set; }

        [Column("TENDOITAC")]
        public string TenDoiTac { get; set; }

        [Column("DONVIDUNG")]
        public string DonViDung { get; set; }

        [Column("IDNHOM")]
        public int IdNhom { get; set; }

        [Column("NGUOITAO")]
        public string NguoiTao { get; set; }

        [Column("NGAYTAO")]
        public DateTime NgayTao { get; set; }

        [Column("NGUOICAPNHAT")]
        public string NguoiCapNhat { get; set; }

        [Column("NGAYCAPNHAT")]
        public DateTime NgayCapNhat { get; set; }

        [Column("PTVATNHAP")]
        public int PTVatNhap { get; set; }

        [Column("PTVATBANLE")]
        public int PTVatBanLe { get; set; }

        [Column("PTVATTOA")]
        public int PTVatToa { get; set; }

        [Column("DONGGOI")]
        public int DongGoi { get; set; }
    }

}
