namespace _315HealthCareProject.Services;

using _315HealthCareProject.DTO;
using _315HealthCareProject.Models;
using System.Threading.Tasks;

public interface IChiNhanhService
{
    Task<string?> GetTenChiNhanhByIdAsync(int idChiNhanh);
    Task<IEnumerable<ChiNhanhDTO>> GetAllChiNhanhAsync();

}
