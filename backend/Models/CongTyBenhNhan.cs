using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Oracle.ManagedDataAccess.Types;

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
        public int? IDCT { get; set; }


        [Column("TRANGTHAIKHAM")]
        public int? TRANGTHAIKHAM { get; set; }


        [Column("KQXN")]
        public byte[]? KQXN { get; set; } 

        [Column("KQKHAM")]
        public byte[]? KQKHAM { get; set; }

        [Column("TRANGTHAISMS")]
        public int? TRANGTHAISMS { get; set; }

        [Column("NGAYTAO")]
        public DateTime? NGAYTAO { get; set; }

        [Column("NGUOITAO")]
        public string? NGUOITAO { get; set; }

        [Column("NGAYKQ")]
        public DateTime? NGAYKQ { get; set; }

        [Column("NGUOIKQ")]
        public string? NGUOIKQ { get; set; }

        [Column("NGAYGUISMS")]
        public DateTime? NGAYGUISMS { get; set; }

        [Column("NGUOIGUISMS")]
        public string? NGUOIGUISMS { get; set; }

        // Các thuộc tính không được ánh xạ từ cơ sở dữ liệu
        [NotMapped]
        public string? TRANGTHAI { get; set; }

        [NotMapped]
        public string? TENCT { get; set; }

        [NotMapped]
        public string? TENTRANGTHAISMS { get; set; }

        [NotMapped]
        public string? MACT { get; set; }

    }
}
