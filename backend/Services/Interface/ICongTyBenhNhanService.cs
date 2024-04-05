using System.Collections.Generic;
using System.Threading.Tasks;
using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services.Interface
{
    public interface ICongTyBenhNhanService
    {
        Task<IEnumerable<CongTyBenhNhan>> GetAllAsync();
        Task AddBenhNhanListAsync(List<CongTyBenhNhan> benhNhanList);
        Task UpdateBenhNhanAsync(CongTyBenhNhan benhNhan);
    }
}
