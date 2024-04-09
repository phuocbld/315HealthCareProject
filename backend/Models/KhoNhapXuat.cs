using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace _315HealthCareProject.Models
{
    [Table("KHONHAPXUAT")]
    public class KhoNhapXuat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IDNHAPXUAT")]
        public int IdNhapXuat { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("MAPHIEU")]
        public string? MaPhieu { get; set; }

        [Column("TENPHIEU")]
        public string TenPhieu { get; set; }

        [Column("IDKHOXUAT")]
        public int? IdKhoXuat { get; set; }

        [Column("IDKHONHAP")]
        public int? IdKhoNhap { get; set; }

        [Column("NOIDUNG")]
        public string NoiDung { get; set; }

        [Column("NVXUAT")]
        public int? NhanVienXuat { get; set; }

        [Column("NVNHAN")]
        public int? NhanVienNhan { get; set; }

        [Column("NGAYXUAT")]
        public DateTime? NgayXuat { get; set; }

        [Column("NGAYNHAN")]
        public DateTime? NgayNhan { get; set; }

        [Column("GHICHU")]
        public string? GhiChu { get; set; }

        [Column("DANHAN")]
        public int? DaNhan { get; set; }

        [Column("TRANGTHAI")]
        public int TrangThai { get; set; }

        [Column("IDDOITAC")]
        public int? IdDoiTac { get; set; }

        [Column("SOHOADON")]
        public string? SoHoaDon { get; set; }

        [Column("NGAYHOADON")]
        public DateTime? NgayHoaDon { get; set; }

        [Column("LINKHOADON")]
        public string? LinkHoaDon { get; set; }

        [Column("FILEHOADON")]
        public byte[]? FileHoaDon { get; set; }

        [Column("IDHINHTHUC")]
        public int? IdHinhThuc { get; set; }

        [Column("IDPHUONGTHUC")]
        public int? IdPhuongThuc { get; set; }

        [Column("CHECKDELETE")]
        public int? CheckDelete { get; set; }

        [NotMapped]
        public string? TenKhoNhap { get; set; } 

        [NotMapped]
        public string? TenKhoXuat { get; set; } 
        [NotMapped] 
        public string? TenNVNhan { get; set; } 

        [NotMapped]
        public string? TenNVXuat { get; set; } 

        [NotMapped]
        public string? TenTrangThai { get; set; } 
    }
}
