using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{
        [Table("DOITUONG")]
        public class DoiTuong
        {
            [Key]
            [Column("IDDT")]
            public int IdDoiTuong { get; set; }

            [Column("DOITUONG")]
            public string TenDoiTuong { get; set; }

            [Column("SUDUNG")]
            public int SuDung { get; set; }

            [Column("GHICHU")]
            public string GhiChu { get; set; }

            [Column("STT")]
            public int Stt { get; set; }
        }
    
}
