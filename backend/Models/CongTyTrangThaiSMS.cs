using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{
    [Table("CONGTY_TRANGTHAISMS")]
    public class CongTyTrangThaiSMS
    {
        [Key]
        [Column("IDTTSMS")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? IDTTSMS { get; set; }

        [Column("TRANGTHAISMS")]
        public string TRANGTHAISMS { get; set; }

        [Column("SUDUNG")]
        public int? SUDUNG { get; set; }

        [Column("GHICHU")]
        public String? GHICHU { get; set; }

    }
}
