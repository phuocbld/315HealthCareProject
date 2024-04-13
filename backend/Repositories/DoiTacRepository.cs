using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Repositories
{
    public class DoiTacRepository : IDoiTacRepository
    {
        private readonly ApplicationDbContext _context;
        public DoiTacRepository (ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<DoiTac>> GetAllAsync()
        {
            return await _context.DoiTacs.ToListAsync();
        }
        public async Task<DoiTac> GetByMaDoiTacAsync(string maDoiTac)
        {
            return await _context.DoiTacs.FirstOrDefaultAsync(d => d.MaDoiTac == maDoiTac);
        }

        public async Task<DoiTac> GetByTenDoiTacAsync(string tenDoiTac)
        {
            return await _context.DoiTacs.FirstOrDefaultAsync(d => d.TenDoiTac == tenDoiTac);
        }

        public async Task<DoiTac> GetByIdAsync(int idDoiTac)
        {
            return await _context.DoiTacs.FirstOrDefaultAsync(d => d.IdDoiTac == idDoiTac);
        }
    }
}
