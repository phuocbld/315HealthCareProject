using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{
    public class ThongTinDangNhap
    {

        [Column("IDND")]
        public int IDND { get; set; }
        [Column("TAIKHOAN")]
        public string TaiKhoan { get; set; }
        [Column("IDNV")]
        public int? IDNV { get; set; }
        [Column("IDCHINHANH")]
        public int? IDChiNhanh { get; set;}
        [Column("MATKHAU")]
        public string MatKhau {  get; set; }
        [Column("DANGNHAPLANCUOI")]
        public int? DangNhapLanCuoi { get; set; }
        [Column("IDNHOM")]
        public int? IdNhom { get; set; }
        [Column("IDDANGNHAP")]
        public int? IDDangNhap { get; set; }
        [Column("DANGNHAP")]
        public DateTime?   DangNhap { get; set; }
        [Column("DANGXUAT")]
        public DateTime? DangXuat { get; set; }
        [Column("IP")]
        public string? IP { get; set; }
        [Column("GHICHU")]
        public string? GhiChu { get; set; }
        [Column("IDPK")]
        public int? IDPK { get; set; }
        [Column("IDCALAMVIEC")]
        public int? IDCaLamViec { get; set; }
        [Column("CHINHANH_DANGNHAP")]
        public int? ChiNhanhDangNhap { get; set; }

        [Column("TENNV")]
         public string TenNV {  get; set; }       
}

}
