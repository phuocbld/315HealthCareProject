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
        Task<string> GetTenCTAsync(int idCT);
        Task DeleteAsync(int idNhapXuat);
        Task<string> GetTenKhoAsync(int idKhoCN);
        Task<string> GetTenNVAsync(int idNhanVien);
        Task<string> GetTrangThaiAsync(int idTrangThai);
        Task<string> GetTenChiNhanhAsync(int idKhoCN);
        Task<IEnumerable<KhoNhapXuat>> GetPhieuNhapByIdChiNhanhAsync(int idChiNhanh);
        Task<IEnumerable<KhoNhapXuat>> GetPhieuNhapByTimeAsync(DateTime fromDate, DateTime toDate);
        Task<IEnumerable<KhoNhapXuat>> GetPhieuNhapByTimeAndBranchAsync(DateTime fromDate, DateTime toDate, int idChiNhanh);

        Task<IEnumerable<KhoNhapXuat>> GetPhieuXuatByIdChiNhanhAsync(int idChiNhanh);
        Task<IEnumerable<KhoNhapXuat>> GetPhieuXuatByTimeAsync(DateTime fromDate, DateTime toDate);
        Task<IEnumerable<KhoNhapXuat>> GetPhieuXuatByTimeAndBranchAsync(DateTime fromDate, DateTime toDate, int idChiNhanh);
    }
}
