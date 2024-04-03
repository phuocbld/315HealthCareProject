using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services.Interface
{
    public interface IThuocVatTuService
    {
        Task<List<ThuocVatTu>> GetAllThuocVatTuAsync();
        Task<IEnumerable<ThuocVatTu>> GetAllAsync();
        Task<ThuocVatTu> CreateThuocVatTu(string maThuoc, string tenBietDuoc, string tenHoatChat, string dvt, int idNhom , int idCT);
    }
}
