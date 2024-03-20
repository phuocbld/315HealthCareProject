using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{
    [Table("NGUONKHACHHANG")]
    public class NguonKhachHang 
    {
        [Key]
        [Column("IDNGUON")]
        public int IdNguonKH { get; set; }

        [Column("NGUON")]
        public string Nguon { get; set; }

        [Column("SUDUNG")]
        public int? SuDung { get; set; }

        [Column("GHICHU")]
        public string? GhiChu { get; set; }

        [Column("STT")]
        public int? STT { get; set; }
    }
}

