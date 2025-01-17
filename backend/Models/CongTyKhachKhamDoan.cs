﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _315HealthCareProject.Models
{

    [Table("CONGTY_KHACHKHAMDOAN")]
    public class CongTyKhachKhamDoan
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IDCT")]
        public int? IDCT { get; set; }

        [Column("MACT")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? MACT { get; set; }

        [Column("TENCT")]
        public string TENCT { get; set; }

        [Column("DIACHI")]
        public string DIACHI { get; set; }

        [Column("DIENTHOAI")]
        public string DIENTHOAI { get; set; }

        [Column("FAX")]
        public string? FAX { get; set; }

        [Column("EMAIL")]
        public string? EMAIL { get; set; }

        [Column("WEBSITE")]
        public string? WEBSITE { get; set; }

        [Column("GHICHU")]
        public string? GHICHU { get; set; }

        [Column("NGAYTAO")]
        public DateTime? NGAYTAO { get; set; }

        [Column("NGUOITAO")]
        public string? NGUOITAO { get; set; }

        [Column("NGAYSUA")]
        public DateTime? NGAYSUA { get; set; }

        [Column("NGUOISUA")]
        public string? NGUOISUA { get; set; }
    }
}
