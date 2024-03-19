

using _315HealthCareProject.DTO;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories;

namespace _315HealthCareProject.Services
{
    public class ChiNhanhService : IChiNhanhService
    {
        private readonly IChiNhanhRepository _repository;

        public ChiNhanhService(IChiNhanhRepository repository)
        {
            _repository = repository;
        }

        public async Task<string?> GetTenChiNhanhByIdAsync(int idChiNhanh)
        {
            return await _repository.GetTenChiNhanhByIdAsync(idChiNhanh);
        }

        public async Task<IEnumerable<ChiNhanhDTO>> GetAllChiNhanhAsync()
        {
            var chiNhanhs = await _repository.GetAllChiNhanhAsync();
            return chiNhanhs.Select(c => new ChiNhanhDTO
            {
                IdChiNhanh = c.IdChiNhanh,
                TenChiNhanh = c.TenChiNhanh
            });
        }
    }
    }


