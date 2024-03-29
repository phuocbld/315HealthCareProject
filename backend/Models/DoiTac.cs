namespace _315HealthCareProject.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("DOITAC")]
    public class DoiTac
    {
        [Key]
        [Column("IDDOITAC")]
        public int? IdDoiTac { get; set; }

        [Column("MADOITAC")]
        public string? MaDoiTac { get; set; }

        [Column("TENDOITAC")]
        public string? TenDoiTac { get; set; }

        [Column("DIACHI")]
        public string? DiaChi { get; set; }

        [Column("IDTINH")]
        public int? IdTinh { get; set; }

        [Column("IDQUAN")]
        public int? IdQuan { get; set; }

        [Column("IDPHUONG")]
        public int? IdPhuong { get; set; }

        [Column("DIENTHOAI")]
        public string? DienThoai { get; set; }

        [Column("MASOTHUE")]
        public string? MaSoThue { get; set; }

        [Column("FAX")]
        public string? Fax { get; set; }

        [Column("EMAIL")]
        public string? Email { get; set; }

        [Column("WEBSITE")]
        public string? Website { get; set; }

        [Column("NGUOILIENHE")]
        public string? NguoiLienHe { get; set; }

        [Column("DIDONG")]
        public string? DiDong { get; set; }

        [Column("GHICHU")]
        public string? GhiChu { get; set; }

        [Column("SUDUNG")]
        public int? SuDung { get; set; }

        [Column("NGUOITAO")]
        public int? NguoiTao { get; set; }

        [Column("NGAYTAO")]
        public DateTime? NgayTao { get; set; }

        [Column("TKNGANHANG")]
        public string? TaiKhoanNganHang { get; set; }

        [Column("NGANHANG")]
        public string? NganHang { get; set; }

        [Column("TENTAIKHOAN")]
        public string? TenTaiKhoan { get; set; }
    }

}
