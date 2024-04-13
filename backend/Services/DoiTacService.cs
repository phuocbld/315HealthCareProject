using System.Collections.Generic;
using System.Threading.Tasks;
using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Services
{
    public class DoiTacService : IDoiTacService
    {

        private readonly IDoiTacRepository _repository;

        public DoiTacService(IDoiTacRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<DoiTac>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }
        public async Task<DoiTac> GetDoiTacByMaDoiTacAsync(string maDoiTac)
        {
            return await _repository.GetByMaDoiTacAsync(maDoiTac);
        }

        public async Task<DoiTac> GetDoiTacByTenDoiTacAsync(string tenDoiTac)
        {
            return await _repository.GetByTenDoiTacAsync(tenDoiTac);
        }

        public async Task<DoiTac> GetDoiTacByIdAsync(int idDoiTac)
        {
            return await _repository.GetByIdAsync(idDoiTac);
        }
    }
}
