namespace _315HealthCareProject.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

    [Table("NGUOIDUNG")]
    public class NguoiDung
    {
        [Key]
        [Column("IDND")]
        public int IdNguoiDung { get; set; }

        [Column("TAIKHOAN")]
        public string TaiKhoan { get; set; }

        [Column("MATKHAU")]
        public string MatKhau { get; set; }

        [Column("IDNV")]
        public int? IdNhanVien { get; set; }

        [Column("IDCHINHANH")]
        public int? IdChiNhanh { get; set; }

        [Column("NGUOITAO")]
        public int? NguoiTao { get; set; }

        [Column("NGAYTAO")]
        public DateTime? NgayTao { get; set; }

        [Column("NGUOISUA")]
        public int? NguoiSua { get; set; }

        [Column("NGAYSUA")]
        public DateTime? NgaySua { get; set; }

        [Column("DANGNHAPLANCUOI")]
        public int? DangNhapLanCuoi { get; set; }

        [Column("IDNHOM")]
        public int? IdNhom { get; set; }

        [Column("SUDUNG")]
        public int? SuDung { get; set; }

        [Column("GHICHU")]
        public string? GhiChu { get; set; }
    }


