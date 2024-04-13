using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface IThuocVatTuRepository
    {
        Task<List<ThuocVatTu>> GetAllThuocVatTuAsync();
        Task<IEnumerable<ThuocVatTu>> GetAllAsync();
        Task<ThuocVatTu> CreateThuocVatTu(string maThuoc, string tenBietDuoc, string tenHoatChat, string dvt);
        Task<ThuocVatTu> GetThuocVatTuByIdAsync(int id);
        Task UpdateAsync(ThuocVatTu thuocVatTu);
        Task<IEnumerable<ThuocVatTu>> SearchThuocVatTuAsync(string? keyword);
    }
}
