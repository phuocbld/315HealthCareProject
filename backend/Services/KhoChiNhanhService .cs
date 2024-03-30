using System.Collections.Generic;
using System.Threading.Tasks;
using _315HealthCareProject.DTO;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Services
{
    public class KhoChiNhanhService : IKhoChiNhanhService
    {
        private readonly IKhoChiNhanhRepository _repository;

        public KhoChiNhanhService(IKhoChiNhanhRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<KhoInfoDTO>> GetKhoInfoByChiNhanhIdAsync(int idChiNhanh)
        {
            return await _repository.GetKhoInfoByChiNhanhIdAsync(idChiNhanh);
        }
    }
}
