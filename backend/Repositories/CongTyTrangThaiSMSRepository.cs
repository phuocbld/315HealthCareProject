using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Repositories
{
    public class CongTyTrangThaiSMSRepository :  ICongTyTrangThaiSMSRepository
    {
        private readonly ApplicationDbContext _context;


         public CongTyTrangThaiSMSRepository(ApplicationDbContext context)
        {
            _context = context;
           
        }
        public async Task<IEnumerable<CongTyTrangThaiSMS>> GetAllAsync()
        {
            return await _context.CongTyTrangThaiSMs.ToListAsync();
        }

        public async Task<CongTyTrangThaiSMS> GetByIdAsync(int id)
        {
            return await _context.CongTyTrangThaiSMs.FindAsync(id);
        }

        public async Task<string> GetTenTrangThaiSMSByIdAsync(int id)
        {
            var tenTrangThaiSMS = await _context.CongTyTrangThaiSMs
                .Where(tt => tt.IDTTSMS == id)
                .Select(tt => tt.TRANGTHAISMS)
                .FirstOrDefaultAsync();

            return tenTrangThaiSMS;
        }
    }
}
