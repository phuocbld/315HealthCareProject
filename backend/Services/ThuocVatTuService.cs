using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Services
{
    public class ThuocVatTuService : IThuocVatTuService
    {
        private readonly IThuocVatTuRepository _repository;

        public ThuocVatTuService(IThuocVatTuRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ThuocVatTu>> GetAllThuocVatTuAsync()
        {
            return await _repository.GetAllThuocVatTuAsync();
        }

        public async Task<ThuocVatTu> GetThuocVatTuByIdAsync(int id)
        {
            var thuocVatTus = await _repository.GetAllThuocVatTuAsync();
            return thuocVatTus.FirstOrDefault(t => t.IdThuoc == id);
        }
    }
}
