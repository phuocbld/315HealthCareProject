using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services.Interface;

public interface ICaLamViecService
{
    Task<IEnumerable<CaLamViec>> GetAllAsync();
}