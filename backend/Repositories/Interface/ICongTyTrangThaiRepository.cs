using System.Collections.Generic;
using System.Threading.Tasks;
using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface ICongTyTrangThaiRepository
    {
        Task<IEnumerable<CongTyTrangThai>> GetAllAsync();
        Task<CongTyTrangThai> GetByIdAsync(int id);
    }
}
