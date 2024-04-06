using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface ICongTyTrangThaiSMSRepository
    {
        Task<IEnumerable<CongTyTrangThaiSMS>> GetAllAsync();
        Task<CongTyTrangThaiSMS> GetByIdAsync(int id);
        Task<string> GetTenTrangThaiSMSByIdAsync(int id);
    }
}
