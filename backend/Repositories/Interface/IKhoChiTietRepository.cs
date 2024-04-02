using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface IKhoChiTietRepository
    {
        Task AddKhoChiTietAsync(KhoChiTiet khoChiTiet);
    }
}
