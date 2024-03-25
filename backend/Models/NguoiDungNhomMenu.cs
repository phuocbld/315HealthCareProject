using System.ComponentModel.DataAnnotations.Schema;

namespace _315HealthCareProject.Models
{
    public class NguoiDungNhomMenu
    {
        [Column("TAIKHOAN")]
        public string TaiKhoan { get; set; }
        [Column("IDMENU")]
        public int IDMenu { get; set; }
        [Column("TENMENU")]
        public string TenMenu { get; set; }
        [Column("IDMENUCHA")]
        public int? IDMenuCha { get; set; }
        [Column("CHILD_MENUS")]
        public string CHILD_MENUS { get; set; }
    }
}
