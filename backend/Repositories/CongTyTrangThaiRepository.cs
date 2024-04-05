using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Repositories
{
    public class CongTyTrangThaiRepository : ICongTyTrangThaiRepository
    {
        private readonly ApplicationDbContext _context;

        public CongTyTrangThaiRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CongTyTrangThai>> GetAllAsync()
        {
            return await _context.CongTyTrangThais.ToListAsync();
        }

        public async Task<CongTyTrangThai> GetByIdAsync(int id)
        {
            return await _context.CongTyTrangThais.FindAsync(id);
        }
    }
}
