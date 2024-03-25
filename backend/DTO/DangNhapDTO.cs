namespace _315HealthCareProject.DTO
{
    public class DangNhapDTO
    {
        public int IdDangNhap { get; set; }
        public int IdNguoiDung { get; set; }
        public string TenNguoiDung { get; set; }
        public DateTime DangNhap { get; set; }
        public DateTime DangXuat { get; set; }
        public string Ip { get; set; }
        public string GhiChu { get; set; }
        public int IdPK { get; set; }
        public string TenPK { get; set; }
        public int IdCaLamViec { get; set; }
        public string TenCaLamViec { get; set; }
        public int IdChiNhanh { get; set; }
        public string TenChiNhanh { get; set; }
    }
}
