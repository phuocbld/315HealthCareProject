using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services;

public interface ICaLamViecService
{
    Task<IEnumerable<CaLamViec>> GetAllAsync();
}