using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{
    [Table("PHONGKHAM")]
    public class PhongKham
    {
        [Key]
        [Column("IDPK")]
        public int IdPK { get; set; }

        [Column("MAPK")]
        public string MaPK { get; set; }

        [Column("TENPK")]
        public string TenPK { get; set; }

        [Column("NGUOITAO")]
        public int NguoiTao { get; set; }

        [Column("NGAYTAO")]
        public DateTime NgayTao { get; set; }

        [Column("SUDUNG")]
        public int SuDung { get; set; }

        [Column("GHICHU")]
        public string GhiChu { get; set; }

        [Column("IDKHOMACDINH")]
        public int IdKhoMacDinh { get; set; }

        [Column("IDCHUYENKHOA")]
        public int IdChuyenKhoa { get; set; }
    }
}
