using System.Collections.Generic;
using System.Threading.Tasks;
using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services.Interface
{
    public interface ICongTyTrangThaiService
    {
        Task<IEnumerable<CongTyTrangThai>> GetAllAsync();
        Task<CongTyTrangThai> GetByIdAsync(int id);
    }
}
