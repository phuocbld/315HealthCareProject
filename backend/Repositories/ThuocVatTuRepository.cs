using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Repositories
{
    public class ThuocVatTuRepository : IThuocVatTuRepository
    {
        private readonly ApplicationDbContext _context;

        public ThuocVatTuRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ThuocVatTu>> GetAllThuocVatTuAsync()
        {
            return await _context.ThuocVatTus
                .Select(t => new ThuocVatTu
                {
                    IdThuoc = t.IdThuoc,
                    MaThuoc = t.MaThuoc,
                    TenBietDuoc = t.TenBietDuoc
                })
                .ToListAsync();
        }

    


    }
}

