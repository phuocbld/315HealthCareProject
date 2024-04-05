using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{

    [Table("CONGTY_TRANGTHAI")]
    public class CongTyTrangThai
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IDTT")]
        public int IDTT { get; set; }

        [Column("TRANGTHAI")]
        public string TRANGTHAI { get; set; }

        [Column("SUDUNG")]
        public int? SUDUNG { get; set; }

        [Column("GHICHU")]
        public string? GHICHU { get; set; }
    }
}
