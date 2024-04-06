using _315HealthCareProject.Models;
using System.Threading.Tasks;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface ICongTyKhachKhamDoanRepository
    {
        Task<IEnumerable<CongTyKhachKhamDoan>> GetAllAsync();
        Task<CongTyKhachKhamDoan> AddAsync(CongTyKhachKhamDoan congTyKhachKhamDoan);
        Task<CongTyKhachKhamDoan> GetByIdAsync(int id);
        Task<CongTyKhachKhamDoan> UpdateAsync(int id, CongTyKhachKhamDoan congTyKhachKhamDoan);
        Task<string> GetMaCTByIdCT(int idCT);

        Task<string> GetTenCTByIdAsync(int id);
        Task<string> GetMaCTByIdAsync(int id);
        Task DeleteAsync(int id);
    }
}
