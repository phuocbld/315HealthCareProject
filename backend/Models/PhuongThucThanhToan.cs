using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{

    [Table("PHUONGTHUCTHANHTOAN")]
    public class PhuongThucThanhToan
    {
        [Key]
        [Column("IDPHUONGTHUC")]
        public int IDPhuongThuc { get; set; }

        [Column("PHUONGTHUC")]
        public string PhuongThuc { get;set; }

        [Column("SUDUNG")]
        public int? SuDung { get; set; }

        [Column("GHICHU")]
        public string? GhiChu {  get; set; }
    }
}
