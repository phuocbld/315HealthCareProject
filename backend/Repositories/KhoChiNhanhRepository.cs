using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;

namespace _315HealthCareProject.Repositories
{
    public class KhoChiNhanhRepository : IKhoChiNhanhRepository
    {
        private readonly ApplicationDbContext _context;

        public KhoChiNhanhRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<KhoInfo>> GetKhoInfoByChiNhanhIdAsync(int idChiNhanh)
        {
            return await _context.KhoChiNhanhs
                .Where(k => k.IdCN == idChiNhanh)
                .Join(_context.Khos,
                      kcn => kcn.IdKho,
                      k => k.IdKho,
                      (kcn, k) => new KhoInfo
                      {
                          IDKho = k.IdKho,
                          TenKho = k.TenKho
                      })
                .ToListAsync();
        }
    }
    }

