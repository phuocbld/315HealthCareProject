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
        public double? DonGiaMua { get; set; }

        [Column("DONGIABAN")]
        public double? DonGiaBan { get; set; }

        [Column("PHIVANCHUYEN")]
        public double? PhiVanChuyen { get; set; }

        [Column("PHIGIACONG")]
        public double? PhiGiaCong { get; set; }

        [Column("SOLUONGNHAN")]
        public int? SoLuongNhan { get; set; }

        [Column("TRANGTHAICHUYENKHO")]
        public int? TrangThaiChuyenKho { get; set; }

        [Column("PTCKTRUOCVAT")]
        public double? PTCKTruocVat { get; set; }

        [Column("CKTRUOCVAT")]
        public double? CKTruocVat { get; set; }

        [Column("VAT5")]
        public double? Vat5 { get; set; }
        [Column("VAT8")]
        public double? Vat8 { get; set; }
        [Column("VAT10")]
        public double? Vat10 { get; set; }

        [Column("THANHTIEN")]
        public double? ThanhTien { get; set; }

        [Column("THUCTRA")]
        public double? ThucTra { get; set; }

        [Column("CHECKDELETE")]
        public int? CheckDelete { get; set; }

        [Column("SOLUONGLE")]
        public int? SoLuongLe { get; set;}
        [Column("SOLUONGDONGGOI")]
        public int? SoLuongDongGoi { get; set; }
        [Column("QUYCACHDONGGOI")]
        public string? QuyCachDongGoi { get; set; }

        [ForeignKey("IdThuoc")]
        public ThuocVatTu? ThuocVatTu { get; set; }
    }
}
