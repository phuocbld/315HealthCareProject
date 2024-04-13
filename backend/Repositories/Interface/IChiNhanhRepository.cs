namespace _315HealthCareProject.Repositories;

using _315HealthCareProject.DTO;
using _315HealthCareProject.Models;
using System.Threading.Tasks;

public interface IChiNhanhRepository
{
    Task<string?> GetTenChiNhanhByIdAsync(int idChiNhanh);
    Task<IEnumerable<ChiNhanhDTO>> GetAllChiNhanhAsync();
    Task<ChiNhanh> GetByIdAsync(int id);

}

