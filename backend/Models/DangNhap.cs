using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace _315HealthCareProject.Models
{


    [Table("DANGNHAP")]
    public class DangNhap
    {

        [Key]
        [Column("IDDANGNHAP")]
        public int IdDangNhap { get; set; }

        [Column("IDNGUOIDUNG")]
        public int IdNguoiDung { get; set; }

        [Column("DANGNHAP")]
        public DateTime ThoiGianDangNhap { get; set; }

        [Column("DANGXUAT")]
        public DateTime DangXuat { get; set; }

        [Column("IP")]
        public string IP { get; set; }

        [Column("GHICHU")]
        public string? GhiChu { get; set; }
        [Column("IDPK")]
        public int IdPK { get; set; }

        [Column("IDCALAMVIEC")]
        public int IdCaLamViec { get; set; }

        [Column("IDCHINHANH")]
        public int IdChiNhanh { get; set; }


    }
}
