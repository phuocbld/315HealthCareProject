using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services.Interface
{
    public interface IThuocVatTuService
    {
        Task<List<ThuocVatTu>> GetAllThuocVatTuAsync();
        Task<ThuocVatTu> GetThuocVatTuByIdAsync(int id);
    }
}
