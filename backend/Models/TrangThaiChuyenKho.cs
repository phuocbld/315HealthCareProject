using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{


    [Table("TRANGTHAICHUYENKHO")]
    public class TrangThaiChuyenKho
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IDTTCK")]
        public int IdTTCK { get; set; }

        [Column("TRANGTHAI")]
        public string TrangThai { get; set; }

        [Column("SUDUNG")]
        public int SuDung { get; set; }

        [Column("GHICHU")]
        public string GhiChu { get; set;}

    }
}
