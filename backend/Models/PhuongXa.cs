using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{

        [Table("PHUONGXA")]
        public class PhuongXa
        {
            [Key]
            [Column("IDPHUONG")]
            public int IdPhuong { get; set; }

            [Column("MAPHUONG")]
            public string MaPhuong { get; set; }

            [Column("TENPHUONG")]
            public string TenPhuong { get; set; }

            [Column("TENVIETTAT")]
            public string TenVietTat { get; set; }

            [Column("IDQUAN")]
            public int IdQuan { get; set; }

            [Column("NGUOITAO")]
            public int NguoiTao { get; set; }

            [Column("NGAYTAO")]
            public DateTime NgayTao { get; set; }

            [Column("GHICHU")]
            public string GhiChu { get; set; }

            [Column("CAP")]
            public string Cap { get; set; }
        }
    }

