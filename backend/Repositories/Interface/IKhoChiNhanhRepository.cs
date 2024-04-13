using _315HealthCareProject.DTO;
using System.Security.Cryptography.Xml;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface IKhoChiNhanhRepository
    {
        Task<IEnumerable<KhoInfoDTO>> GetKhoInfoByChiNhanhIdAsync(int idChiNhanh);
    }
}
