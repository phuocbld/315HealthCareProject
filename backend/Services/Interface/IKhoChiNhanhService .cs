using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services.Interface
{
    public interface IKhoChiNhanhService
    {
        Task<IEnumerable<KhoInfo>> GetKhoInfoByChiNhanhIdAsync(int idChiNhanh);
    }
}
