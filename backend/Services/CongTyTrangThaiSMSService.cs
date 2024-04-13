using System.Threading.Tasks;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Services
{
    public class CongTyTrangThaiSMSService : ICongTyTrangThaiSMSService
    {
        private readonly ICongTyTrangThaiSMSRepository _repository;

        public CongTyTrangThaiSMSService(ICongTyTrangThaiSMSRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CongTyTrangThaiSMS>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CongTyTrangThaiSMS> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<string> GetTenTrangThaiSMSByIdAsync(int id)
        {
            return await _repository.GetTenTrangThaiSMSByIdAsync(id);
        }
    }
}
