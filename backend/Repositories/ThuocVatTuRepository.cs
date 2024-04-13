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



        public async Task<ThuocVatTu> CreateThuocVatTu(string maThuoc, string tenBietDuoc, string tenHoatChat, string dvt)
        {
            var thuocVatTu = new ThuocVatTu
            {
                MaThuoc = maThuoc,
                TenBietDuoc = tenBietDuoc,
                TenHoatChat = tenHoatChat,
                Dvt = dvt
            };

            _context.ThuocVatTus.Add(thuocVatTu);
            await _context.SaveChangesAsync();

            return thuocVatTu;
        }

        public async Task<IEnumerable<ThuocVatTu>> GetAllAsync()
        {
            return await _context.ThuocVatTus.ToListAsync();
        }

        public async Task<ThuocVatTu> GetThuocVatTuByIdAsync(int id)
        {
            return await _context.ThuocVatTus.FirstOrDefaultAsync(t => t.IdThuoc == id);
        }

        public async Task UpdateAsync(ThuocVatTu thuocVatTu)
        {
            _context.Entry(thuocVatTu).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }


        public async Task<IEnumerable<ThuocVatTu>> SearchThuocVatTuAsync(string? keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
            {
                return await GetAllAsync();
            }
            else
            {
                keyword = keyword.ToLower();
                return await _context.ThuocVatTus.Where(t =>
                    t.MaThuoc.ToLower().Contains(keyword) || t.TenBietDuoc.ToLower().Contains(keyword)
                ).ToListAsync();
            }
        }


    }
}

