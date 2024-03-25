using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace _315HealthCareProject.Models
{

    [Table("TINHTP")]
    public class TinhTP
    {

        [Key]
        [Column("IDTINH")]
        public int IdTinh { get; set; }

        [Column("MATINH")]
        public string MaTinh { get; set; }
        [Column("TENTINH")]
        public string TenTinh { get; set; }
        [Column("TENVIETTAT")]
        public string TenVietTat { get; set; }
        [Column("NGUOITAO")]
        public int NguoiTao { get; set; }
        [Column("NGAYTAO")]
        public DateTime NgayTao { get; set; }
        [Column("GHICHU")]
        public string GhiChu { get; set; }
    }
}
