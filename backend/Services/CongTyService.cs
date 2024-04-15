using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Services
{
    public class CongTyService : ICongTyService
    {
        private readonly ICongTyRepository _congTyRepository;

        public CongTyService(ICongTyRepository congTyRepository)
        {
            _congTyRepository = congTyRepository;
        }

        public IEnumerable<CongTy> GetAllCongTy()
        {
            return _congTyRepository.GetAllCongTy();
        }

        public string GetTenCTById(int id)
        {
            return _congTyRepository.GetTenCTById(id);
        }
    }
}
