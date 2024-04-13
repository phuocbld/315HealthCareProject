using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{

    [Table("NHOMNGUOIDUNG")]
    public class NhomNguoiDung
    {
        [Key]
        [Column("IDNHOM")]
        public int IdNhom { get; set; }

        [Column("MANHOM")]
        public string MaNhom { get; set; }

        [Column("TENNHOM")]
        public string TenNhom { get; set; }

        [Column("TENVIETTAT")]
        public string TenVietTat { get; set; }

        [Column("NGUOITAO")]
        public int? NguoiTao { get; set; }

        [Column("NGAYTAO")]
        public DateTime NgayTao { get; set; }

        [Column("GHICHU")]
        public string? GhiChu { get; set; }

    }
}
