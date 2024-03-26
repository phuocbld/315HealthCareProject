using _315HealthCareProject.Data;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Services
{
    public class NguoiDungService : INguoiDungService
    {
        private readonly ApplicationDbContext _context;

        public NguoiDungService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<int?> GetChiNhanhIdByTaiKhoan(string username)
        {
            var user = await _context.NguoiDungs
                .FirstOrDefaultAsync(u => u.TaiKhoan == username);

            return user?.IdChiNhanh;
        }

        public async Task<int?> GetIdNguoiDungByTaiKhoan(string username)
        {
            var user = await _context.NguoiDungs
                .FirstOrDefaultAsync(u => u.TaiKhoan == username);

            return user?.IdNguoiDung; 
        }
    }
}
