using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services
{
    public class CongTyKhachKhamDoanService : ICongTyKhachKhamDoanService
    {
        private readonly ICongTyKhachKhamDoanRepository _repository;

        public CongTyKhachKhamDoanService(ICongTyKhachKhamDoanRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CongTyKhachKhamDoan>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CongTyKhachKhamDoan> AddAsync(CongTyKhachKhamDoan congTyKhachKhamDoan)
        {
            return await _repository.AddAsync(congTyKhachKhamDoan);
        }

        public async Task<CongTyKhachKhamDoan> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<CongTyKhachKhamDoan> UpdateAsync(int id, CongTyKhachKhamDoan congTyKhachKhamDoan)
        {
            return await _repository.UpdateAsync(id, congTyKhachKhamDoan);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

    }
}
