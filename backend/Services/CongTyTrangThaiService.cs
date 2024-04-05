using System.Collections.Generic;
using System.Threading.Tasks;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Services
{
    public class CongTyTrangThaiService : ICongTyTrangThaiService
    {
        private readonly ICongTyTrangThaiRepository _repository;

        public CongTyTrangThaiService(ICongTyTrangThaiRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CongTyTrangThai>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CongTyTrangThai> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }
    }
}
