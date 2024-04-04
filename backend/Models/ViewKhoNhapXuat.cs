using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{
    public class ViewKhoNhapXuat
    {
        [Column("IDNHAPXUAT")]
        public int IdNhapXuat { get; set; }

        [Column("MAPHIEU")]
        public string? MaPhieu { get; set; }

        [Column("TENPHIEU")]
        public string TenPhieu { get; set; }

        [Column("NGAYNHAN")]
        public DateTime? NgayNhan { get; set; }

        [Column("NGAYXUAT")]
        public DateTime? NgayXuat { get; set; }

        [Column("NVNHAN")]
        public int? NVNhan { get; set; }

        [Column("NOIDUNG")]
        public string NoiDung { get; set; }

        [Column("TENNVNHAN")]
        public string? TenNVNhan { get; set; }

        [Column("NVXUAT")]
        public int? NVXuat { get; set; }

        [Column("TENNVXUAT")]
        public string? TenNVXuat { get; set; }

        [Column("TRANGTHAI")]
        public int? TrangThai { get; set; }

        [Column("TENTRANGTHAI")]
        public string TenTrangThai { get; set; }

        [Column("IDKHONHAP")]
        public int? IdKhoNhap { get; set; }

        [Column("TENKHONHAP")]
        public string? TenKhoNhap { get; set; }

        [Column("IDKHOXUAT")]
        public int? IdKhoXuat { get; set; }

        [Column("TENKHOXUAT")]
        public string? TenKhoXuat { get; set; }

        [Column("DANHAN")]
        public bool? DaNhan { get; set; }

        [Column("IDDOITAC")]
        public int? IdDoiTac { get; set; }

        [Column("SOHOADON")]
        public string? SoHoaDon { get; set; }

        [Column("NGAYHOADON")]
        public DateTime? NgayHoaDon { get; set; }

        [Column("LINKHOADON")]
        public string? LinkHoaDon { get; set; }

        [Column("FILEHOADON")]
        public string? FileHoaDon { get; set; }

        [Column("CHECKDELETE")]
        public int? CheckDelete { get; set; }
    }
}
