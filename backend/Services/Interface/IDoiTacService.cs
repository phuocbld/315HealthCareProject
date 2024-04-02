using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services.Interface
{
    public interface IDoiTacService
    {
        Task<IEnumerable<DoiTac>> GetAllAsync();
        Task<DoiTac> GetDoiTacByMaDoiTacAsync(string maDoiTac);
        Task<DoiTac> GetDoiTacByTenDoiTacAsync(string tenDoiTac);
        Task<DoiTac> GetDoiTacByIdAsync(int idDoiTac);
    }
}
