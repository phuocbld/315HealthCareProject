using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Services;

public class CaLamViecService : ICaLamViecService
{
    private readonly ICaLamViecRepository _repository;

    public CaLamViecService(ICaLamViecRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<CaLamViec>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }
}