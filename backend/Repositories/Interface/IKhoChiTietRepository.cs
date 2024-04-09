
using _315HealthCareProject.Models;
using System.Threading.Tasks;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface IKhoChiTietRepository
    {
        Task AddKhoChiTietAsync(KhoChiTiet khoChiTiet);
        Task<IEnumerable<KhoChiTiet>> GetKhoChiTietByNhapXuatIdAsync(int idNhapXuat);

    }
}
