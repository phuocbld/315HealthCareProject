using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{
    [Table("KHOCHINHANH")]
    public class KhoChiNhanh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IDKHOCN")]
        public int IdKhoCN { get; set; }

        [Column("IDKHO")]
        public int IdKho { get; set; }

        [Column("IDCN")]
        public int IdCN { get; set; }

        [Column("NGUOITAO")]
        public int NguoiTao { get; set; }

        [Column("NGAYTAO")]
        public DateTime? NgayTao { get; set; }

        [Column("GHICHU")]
        public string? GhiChu { get; set; }

        [Column("THUKHO")]
        public string? ThuKho { get; set; }
    }
}
