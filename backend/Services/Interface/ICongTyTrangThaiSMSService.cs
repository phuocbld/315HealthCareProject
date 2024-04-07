using System.Threading.Tasks;
using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services.Interface
{
    public interface ICongTyTrangThaiSMSService
    {
        Task<IEnumerable<CongTyTrangThaiSMS>> GetAllAsync();
        Task<CongTyTrangThaiSMS> GetByIdAsync(int id);
        Task<string> GetTenTrangThaiSMSByIdAsync(int id);
    }
}
