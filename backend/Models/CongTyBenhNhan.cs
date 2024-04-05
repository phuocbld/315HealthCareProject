using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{

    [Table("CONGTY_BENHNHAN")]
    public class CongTyBenhNhan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IDBN")]
        public int? IDBN { get; set; }

        [Column("MABN")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? MABN { get; set; }

        [Column("TENBN")]
        public string TENBN { get; set; }

        [Column("GIOITINH")]
        public string GIOITINH { get; set; }

        [Column("NGAYSINH")]
        public DateTime? NGAYSINH { get; set; }

        [Column("SODIENTHOAI")]
        public string? SODIENTHOAI { get; set; }

        [Column("GHICHU")]
        public string? GHICHU { get; set; }

        [Column("IDCT")]
        public int IDCT { get; set; }

        [Column("TRANGTHAIKHAM")]
        public int? TRANGTHAIKHAM { get; set; }

        [Column("KQXN")]
        public string? KQXN { get; set; }

        [Column("KQKHAM")]
        public string? KQKHAM { get; set; }

        [Column("DAGUISMS")]
        public int DAGUISMS { get; set; }
    }
}

