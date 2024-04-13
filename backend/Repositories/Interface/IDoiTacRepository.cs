using _315HealthCareProject.Models;
using Microsoft.AspNetCore.Mvc;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface IDoiTacRepository 
    {
        Task<IEnumerable<DoiTac>> GetAllAsync();
        Task<DoiTac> GetByMaDoiTacAsync(string maDoiTac);
        Task<DoiTac> GetByIdAsync(int idDoiTac);
        Task<DoiTac> GetByTenDoiTacAsync(string tenDoiTac);

    }
}
