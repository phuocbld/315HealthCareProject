﻿
using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace _315HealthCareProject.Repositories
{
    public class KhoChiTietRepository : IKhoChiTietRepository
    {
        private readonly ApplicationDbContext _context;

        public KhoChiTietRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddKhoChiTietAsync(KhoChiTiet khoChiTiet)
        {
            _context.KhoChiTiets.Add(khoChiTiet);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<KhoChiTiet>> GetKhoChiTietByNhapXuatIdAsync(int idNhapXuat)
        {
            var khoChiTietList = await _context.KhoChiTiets
                .Where(k => k.IdNhapXuat == idNhapXuat)
                .Include(k => k.ThuocVatTu)
                .ToListAsync();

            return khoChiTietList;
        }
    }
}
