using _315HealthCareProject.Models;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services.Interface
{
    public interface ICongTyKhachKhamDoanService
    {
        Task<IEnumerable<CongTyKhachKhamDoan>> GetAllAsync();
        Task<CongTyKhachKhamDoan> AddAsync(CongTyKhachKhamDoan congTyKhachKhamDoan);
        Task<CongTyKhachKhamDoan> GetByIdAsync(int id);
        Task<CongTyKhachKhamDoan> UpdateAsync(int id, CongTyKhachKhamDoan congTyKhachKhamDoan);
    }
}

