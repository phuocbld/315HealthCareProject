using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{
    [Table("HINHTHUCTHANHTOAN")]
    public class HinhThucThanhToan
    {
        [Key]
        [Column("IDHINHTHUC")]
        public int IdHinhThuc { get; set; }

        [Column("HINHTHUCTHANHTOAN")]
        public string TenHinhThuc { get; set; }

        [Column("SUDUNG")]
        public int SuDung { get; set; }

        [Column("GHICHU")]
        public string GhiChu { get; set; }

        [Column("STT")]
        public int Stt { get; set; }
    }
}
