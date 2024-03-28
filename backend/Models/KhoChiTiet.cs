using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{
    [Table("KHOCHITIET")]
    public class KhoChiTiet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        [Column("IDCHITIETNX")]
        public int IdChiTietNX { get; set; }

        [Column("IDNHAPXUAT")]
        public int IdNhapXuat { get; set; }

        [Column("MACHITIETNX")]
        public string MaChiTietNX { get; set; }

        [Column("IDTHUOC")]
        public int IdThuoc { get; set; }

        [Column("IDHANGHOA")]
        public int IdHangHoa { get; set; }

        [Column("SOLO")]
        public string SoLo { get; set; }

        [Column("HANDUNG")]
        public DateTime HanDung { get; set; }

        [Column("SOLUONG")]
        public int SoLuong { get; set; }

        [Column("DONGIAMUA")]
        public int DonGiaMua { get; set; }

        [Column("DONGIABAN")]
        public int DonGiaBan { get; set; }

        [Column("PHIVANCHUYEN")]
        public int PhiVanChuyen { get; set; }

        [Column("PHIGIACONG")]
        public int PhiGiaCong { get; set; }

        [Column("SOLUONGNHAN")]
        public int SoLuongNhan { get; set; }

        [Column("TRANGTHAICHUYENKHO")]
        public int TrangThaiChuyenKho { get; set; }
    }
}
