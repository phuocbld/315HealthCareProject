using _315HealthCareProject.DTO;
using _315HealthCareProject.Models;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services.Interface
{
    public interface IKhoNhapXuatService
    {
        //Task DeleteKhoNhapXuatAsync(int id);
        Task<KhoNhapXuat> CreateKhoNhap(string tenPhieu, string noiDung, int trangThai);
        Task<KhoNhapXuat> CreateKhoXuat(string tenPhieu, string noiDung, int trangThai);
        Task<IEnumerable<KhoNhapXuat>> GetAllPhieuNhapAsync();
        Task<IEnumerable<KhoNhapXuat>> GetAllPhieuXuatAsync();
        Task<IEnumerable<KhoNhapXuat>> GetAllKhoNhapXuatAsync();
        Task<KhoNhapXuat> GetKhoNhapXuatByIdAsync(int id);
        Task<KhoNhapXuat> UpdateKhoNhapXuatAsync(int id, KhoNhapXuat khoNhapXuat);
        Task DeleteAsync(int idNhapXuat);


        Task<string> GetTenKhoAsync(int idKhoCN);
        Task<string> GetTenNVAsync(int idNhanVien);
        Task<string> GetTrangThaiAsync(int idTrangThai);
    }
}
