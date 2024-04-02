using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface IThuocVatTuRepository
    {
        Task<List<ThuocVatTu>> GetAllThuocVatTuAsync();
        Task<IEnumerable<ThuocVatTu>> GetAllAsync();
    }
}
