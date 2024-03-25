using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{

    [Table("DANTOC")]
    public class DanToc 
    {

        [Key]
        [Column("IDDANTOC")]
        public int IdDanToc { get; set; }

        [Column("DANTOC")]
        public string TenDanToc { get; set; }

        [Column("SUDUNG")]
        public int? SuDung { get; set; }

        [Column("GHICHU")]
        public string? GhiChu { get; set; }

    }
}
