using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Repositories
{
    public class KhoNhapXuatRepository : IKhoNhapXuatRepository
    {
        private readonly ApplicationDbContext _context;

        public KhoNhapXuatRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<KhoNhapXuat>> GetAllPhieuNhapAsync()
        {
            return await _context.KhoNhapXuats.Where(k => k.IdKhoNhap.HasValue).ToListAsync();
        }

        public async Task<IEnumerable<KhoNhapXuat>> GetAllPhieuXuatAsync()
        {
            return await _context.KhoNhapXuats.Where(k => k.IdKhoXuat.HasValue).ToListAsync();
        }
    }
}
