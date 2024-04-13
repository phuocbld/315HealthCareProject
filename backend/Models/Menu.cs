using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{
    [Table("MENU")]
    public class Menu
    {
        [Key]
        [Column("IDMENU")]
        public int IdMenu { get; set; }

        [Column("MAMENU")]
        public string MaMenu { get; set; }

        [Column("TENMENU")]
        public string TenMenu { get; set; }

        [Column("TENVIETTAT")]
        public string TenVietTat { get; set; }


        [Column("IDMENUCHA")]
        public int? IdMenuCha { get; set; }

        [Column("LINKS")]
        public string Links { get; set; }

        [Column("NGUOITAO")]
        public int NguoiTao { get; set; }

        [Column("NGAYTAO")]
        public DateTime NgayTao { get; set; }

        [Column("GHICHU")]
        public string? Ghichu { get; set; }

        [Column("STT")]
        public int? Stt { get; set; }


    }
}
