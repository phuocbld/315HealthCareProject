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
        public string? MaChiTietNX { get; set; }

        [Column("IDTHUOC")]
        public int IdThuoc { get; set; }

        [Column("SOLO")]
        public string? SoLo { get; set; }

        [Column("HANDUNG")]
        public DateTime? HanDung { get; set; }

        [Column("SOLUONG")]
        public int SoLuong { get; set; }

        [Column("DONGIAMUA")]
        public int? DonGiaMua { get; set; }

        [Column("DONGIABAN")]
        public int? DonGiaBan { get; set; }

        [Column("PHIVANCHUYEN")]
        public int? PhiVanChuyen { get; set; }

        [Column("PHIGIACONG")]
        public int? PhiGiaCong { get; set; }

        [Column("SOLUONGNHAN")]
        public int? SoLuongNhan { get; set; }

        [Column("TRANGTHAICHUYENKHO")]
        public int? TrangThaiChuyenKho { get; set; }

        [Column("PTCKTRUOCVAT")]
        public int? PTCKTruocVat { get; set; }

        [Column("CKTRUOCVAT")]
        public int? CKTruocVat { get; set; }

        [Column("VAT5")]
        public int? Vat5 { get; set; }
        [Column("VAT8")]
        public int? Vat8 { get; set; }
        [Column("VAT10")]
        public int? Vat10 { get; set; }

        [Column("THANHTIEN")]
        public int? ThanhTien { get; set; }

        [Column("THUCTRA")]
        public int? ThucTra { get; set; }

        [Column("CHECKDELETE")]
        public int? CheckDelete { get; set; }
    }
}
