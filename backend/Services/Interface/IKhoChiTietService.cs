using _315HealthCareProject.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services.Interfaces
{
    public interface IKhoChiTietService
    {
        Task AddKhoChiTietListAsync(List<KhoChiTiet> khoChiTietList);
        Task<IEnumerable<KhoChiTiet>> GetKhoChiTietByNhapXuatIdAsync(int idNhapXuat);

    }
}
