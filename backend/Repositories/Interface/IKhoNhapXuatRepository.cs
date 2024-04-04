using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface IKhoNhapXuatRepository
    {

        //Task DeleteKhoNhapXuatAsync(int id);
        Task<IEnumerable<KhoNhapXuat>> GetAllPhieuNhapAsync();
        Task<IEnumerable<KhoNhapXuat>> GetAllPhieuXuatAsync();
        Task<IEnumerable<KhoNhapXuat>> GetAllKhoNhapXuatAsync();
        Task<KhoNhapXuat> GetKhoNhapXuatByIdAsync(int id);
        Task UpdateAsync(KhoNhapXuat khoNhapXuat);

        Task DeleteAsync(int idNhapXuat);
        Task<string> GetTenKhoAsync(int idKhoCN);
        Task<string> GetTenNVAsync(int idNhanVien);
        Task<string> GetTrangThaiAsync(int idTrangThai);

    }
}
