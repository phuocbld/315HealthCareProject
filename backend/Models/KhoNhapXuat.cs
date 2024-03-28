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
    }
}
