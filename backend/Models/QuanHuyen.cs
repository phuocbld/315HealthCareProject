using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{


    [Table("QUANHUYEN")]
    public class QuanHuyen
    {

        [Key]
        [Column("IDQUAN")]
        public int IdQuan { get; set; }

        [Column("MAQUAN")]
        public string MaQuan { get; set; }

        [Column("TENQUAN")]
        public string TenQuan { get; set; }

        [Column("TENVIETTAT")]
        public string TenVietTat { get; set; }

        [Column("IDTINH")]
        public int IdTinh { get; set; }

        [Column("NGUOITAO")]
        public int NguoiTao { get; set; }

        [Column("NGAYTAO")]
        public DateTime NgayTao { get; set; }

        [Column("GHICHU")]
        public string GhiChu { get; set; }


        //[ForeignKey("IdTinh")]
        //public TinhTP Tinh { get; set; }
    }
}
