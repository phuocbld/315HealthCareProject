using System.Threading.Tasks;
using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Services
{
    public class NhomNguoiDungService : INhomNguoiDungService
    {
        private readonly ApplicationDbContext _context;

        public NhomNguoiDungService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> GetTenNhomByIdAsync(int idNhom)
        {
            var tenNhom = await _context.NhomNguoiDungs
                .Where(nhom => nhom.IdNhom == idNhom)
                .Select(nhom => nhom.TenNhom)
                .FirstOrDefaultAsync();

            return tenNhom;
        }
    }
}
