using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services
{
    public interface IDangNhapService
    {
        Task<DangNhap> CheckAndCreateDangNhapAsync(string taiKhoan, int chiNhanhDangNhap);
        Task<DangNhap> GetByIdAsync(int id);
        Task UpdateAsync(DangNhap dangNhap);

    }
}
