using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{

    [Table("NGHENGHIEP")]
    public class NgheNghiep
    {
        [Key]
        [Column("IDNN")]
        public int IdNN { get; set; }

        [Column("NGHENGHIEP")]
        public string TenNN { get; set; }

        [Column("SUDUNG")]
        public int? SuDung { get; set; }

        [Column("GHICHU")]
        public string? GhiChu { get; set; }

        [Column("STT")]
        public int? STT { get ;  set; }
    }
}
