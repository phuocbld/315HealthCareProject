using _315HealthCareProject.Models;
using System.Security.Cryptography.Xml;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface IKhoChiNhanhRepository
    {
        Task<IEnumerable<KhoInfo>> GetKhoInfoByChiNhanhIdAsync(int idChiNhanh);
    }
}
