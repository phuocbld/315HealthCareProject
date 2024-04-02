using _315HealthCareProject.DTO;

namespace _315HealthCareProject.Services.Interface
{
    public interface IKhoChiNhanhService
    {
        Task<IEnumerable<KhoInfoDTO>> GetKhoInfoByChiNhanhIdAsync(int idChiNhanh);
    }
}
