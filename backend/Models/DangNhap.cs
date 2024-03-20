using System;
namespace _315HealthCareProject.Models
{
    public class DangNhap
    {
        public int IdDangNhap { get; set; }
        public int IdNguoiDung { get; set; }
        public int IdChiNhanh { get; set; }
        public int IdPK { get; set; }
        public int IdCaLamViec { get; set; }
        public DateTime ThoiGianDangNhap { get; set; }
        public DateTime DangXuat { get; set; }
        public string IP { get; set; }
        public string GhiChu { get; set; }
    }
}
