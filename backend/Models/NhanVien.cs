using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{

    [Table("NHANVIEN")]
    public class NhanVien
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Column("MANV")]
        public string? MANV { get; set; }
        [Column("TENNV")]
        public string TENNV { get; set; }
        [Column("DIACHI")]
        public string? DIACHI { get; set; }
        [Column("DIENTHOAI")]
        public string? DIENTHOAI { get; set; }
        [Column("IDTINH")]
        public int? IDTINH { get; set; }
        [Column("IDQUAN")]
        public int? IDQUAN { get; set; }
        [Column("IDPHUONG")]
        public int? IDPHUONG { get; set; }
        [Column("IDCHINHANH")]
        public int? IDCHINHANH { get; set; }
        [Column("NGUOITAO")]
        public string? NGUOITAO { get; set; }
        [Column("NGAYTAO")]
        public int? NGAYTAO { get; set; }
        [Column("IDCHUCDANH")]
        public int? IDCHUCDANH { get; set; }
        [Column("GHICHU")]
        public string GHICHU { get; set; }
        [Column("IDBANGCAP")]
        public int? IDBANGCAP { get; set; }
    }
}
