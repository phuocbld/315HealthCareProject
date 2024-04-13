using Microsoft.AspNetCore.Http;

namespace _315HealthCareProject.DTO
{

    public class CongTyBenhNhanDTO
    {
        public int? IDBN { get; set; }
        public string? MABN { get; set; }
        public string? TENBN { get; set; }
        public string? GIOITINH { get; set; }
        public DateTime? NGAYSINH { get; set; }
        public string? SODIENTHOAI { get; set; }
        public string? GHICHU { get; set; }
        public int? IDCT { get; set; }
        public int? TRANGTHAIKHAM { get; set; }
        public IFormFile? KQXNFile { get; set; }
        public IFormFile? KQKhamFile { get; set; }
        public int? TRANGTHAISMS { get; set; }
        public DateTime? NGAYTAO { get; set; }
        public string? NGUOITAO { get; set; }
        public DateTime? NGAYKQ { get; set; }
        public string? NGUOIKQ { get; set; }
        public DateTime? NGAYGUISMS { get; set; }
        public string? NGUOIGUISMS { get; set; }
        public string? TRANGTHAI { get; set; }
        public string? TENCT { get; set; }
        public string? TENTRANGTHAISMS { get; set; }
        public string? MACT { get; set; }
    }

}
