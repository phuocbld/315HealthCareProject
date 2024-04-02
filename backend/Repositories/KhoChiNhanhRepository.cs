using _315HealthCareProject.Data;
using _315HealthCareProject.DTO;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _315HealthCareProject.Repositories
{
    public class KhoChiNhanhRepository : IKhoChiNhanhRepository
    {
        private readonly ApplicationDbContext _context;

        public KhoChiNhanhRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<KhoInfoDTO>> GetKhoInfoByChiNhanhIdAsync(int idChiNhanh)
        {
            return await _context.KhoChiNhanhs
                .Where(kcn => kcn.IdCN == idChiNhanh)
                .Join(_context.Khos,
                      kcn => kcn.IdKho,
                      k => k.IdKho,
                      (kcn, k) => new KhoInfoDTO
                      {
                          IDKhoCN = kcn.IdKhoCN,
                          IDKho = k.IdKho,
                          TenKho = k.TenKho,
                      })
                .ToListAsync();
        }
    }
}
