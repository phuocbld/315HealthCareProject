using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{
    [Table("NHOMQUYEN")]
    public class NhomQuyen
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Column("IDNHOM")]
        public int IdNhom { get; set; }

        [Column("IDMENU")]
        public int idMenu { get; set; }

        [Column("NGUOITAO")]
        public int? NguoiTao { get; set; }

        [Column("NGAYTAO")]
        public DateTime NgayTao { get; set; }

        public NhomNguoiDung NhomNguoiDung { get; set; }
    }
}
