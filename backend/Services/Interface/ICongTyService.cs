using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services.Interface
{
    public interface ICongTyService
    {
        IEnumerable<CongTy> GetAllCongTy();
        string GetTenCTById(int id);
    }
}
