using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{
    [Table("KHO")]
    public class Kho
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IDKHO")]
        public int IdKho { get; set; }

        [Column("MAKHO")]
        public string MaKho { get; set; }

        [Column("TENKHO")]
        public string TenKho { get; set; }

        [Column("DIENTHOAI")]
        public string DienThoai { get; set; }

        [Column("NGUOITAO")]
        public int NguoiTao { get; set; }

        [Column("NGAYTAO")]
        public DateTime NgayTao { get; set; }

        [Column("SUDUNG")]
        public int SuDung { get; set; }

        [Column("GHICHU")]
        public string GhiChu { get; set; }

        [Column("KHOCHINH")]
        public int KhoChinh { get; set; }

        [Column("IDCT")]
        public int IdCT { get; set; }
    }
}
