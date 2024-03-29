using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ICaLamViecRepository
{
    Task<IEnumerable<CaLamViec>> GetAllAsync();
}