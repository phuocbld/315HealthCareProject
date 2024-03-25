using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{


    [Table("QUOCTICH")]
    public class QuocTich
    {
        [Key]
        [Column("IDQT")]
        public int IdQuocTich { get; set; }

        [Column("QUOCTICH")]
        public string TenQuocTich { get; set; }

        [Column("SUDUNG")]
        public int? SuDung { get; set; }

        [Column("GHICHU")]
        public string? GhiChu { get; set; }

        [Column("STT")]
        public int? STT { get; set; }

    }
}
