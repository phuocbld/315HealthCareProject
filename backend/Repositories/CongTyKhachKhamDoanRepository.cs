using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace _315HealthCareProject.Repositories
{
    public class CongTyKhachKhamDoanRepository : ICongTyKhachKhamDoanRepository
    {
        private readonly ApplicationDbContext _context;

        public CongTyKhachKhamDoanRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CongTyKhachKhamDoan>> GetAllAsync()
        {
            return await _context.CongTyKhachKhamDoans.ToListAsync();
        }

        public async Task<CongTyKhachKhamDoan> AddAsync(CongTyKhachKhamDoan congTyKhachKhamDoan)
        {
            _context.CongTyKhachKhamDoans.Add(congTyKhachKhamDoan);
            await _context.SaveChangesAsync();
            return congTyKhachKhamDoan;
        }

        public async Task<CongTyKhachKhamDoan> GetByIdAsync(int id)
        {
            return await _context.CongTyKhachKhamDoans.FindAsync(id);
        }
        public async Task<CongTyKhachKhamDoan> UpdateAsync(int id, CongTyKhachKhamDoan congTyKhachKhamDoan)
        {
            var existingCongTy = await _context.CongTyKhachKhamDoans.FindAsync(id);
            if (existingCongTy != null)
            {
                existingCongTy.MACT = congTyKhachKhamDoan.MACT;
                existingCongTy.TENCT = congTyKhachKhamDoan.TENCT;
                existingCongTy.DIACHI = congTyKhachKhamDoan.DIACHI;
                existingCongTy.DIENTHOAI = congTyKhachKhamDoan.DIENTHOAI;
                existingCongTy.FAX = congTyKhachKhamDoan.FAX;
                existingCongTy.EMAIL = congTyKhachKhamDoan.EMAIL;
                existingCongTy.WEBSITE = congTyKhachKhamDoan.WEBSITE;
                existingCongTy.GHICHU = congTyKhachKhamDoan.GHICHU;

                await _context.SaveChangesAsync();
            }
            return existingCongTy;
        }
        public async Task<string> GetMaCTByIdCT(int idCT)
        {
            var congTyKhachKhamDoan = await _context.CongTyKhachKhamDoans
                .FirstOrDefaultAsync(ct => ct.IDCT == idCT);

            if (congTyKhachKhamDoan != null)
            {
                return congTyKhachKhamDoan.MACT;
            }

            return null;
        }

        public async Task<string> GetTenCTByIdAsync(int id)
        {
            var tenCT = await _context.CongTyKhachKhamDoans
                .Where(ct => ct.IDCT == id)
                .Select(ct => ct.TENCT)
                .FirstOrDefaultAsync();

            return tenCT;
        }

        public async Task<string> GetMaCTByIdAsync(int id)
        {
            var tenCT = await _context.CongTyKhachKhamDoans
                .Where(ct => ct.IDCT == id)
                .Select(ct => ct.MACT)
                .FirstOrDefaultAsync();

            return tenCT;
        }
        public async Task DeleteAsync(int id)
        {
            var congTyDelete = await _context.CongTyKhachKhamDoans.FindAsync(id);
            if (congTyDelete != null)
            {
                _context.CongTyKhachKhamDoans.Remove(congTyDelete);
                await _context.SaveChangesAsync();
            }
        }

    }
}
