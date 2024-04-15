using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface ICongTyRepository
    {
        string GetTenCTById(int id);
        IEnumerable<CongTy> GetAllCongTy();
    }
}
