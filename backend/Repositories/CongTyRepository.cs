using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;

namespace _315HealthCareProject.Repositories
{
    public class CongTyRepository : ICongTyRepository
    {
        private readonly ApplicationDbContext _context;

        public CongTyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<CongTy> GetAllCongTy()
        {
            return _context.CongTys.ToList();
        }

        public string GetTenCTById(int id)
        {
            var company = _context.CongTys.FirstOrDefault(c => c.IDCT == id);
            return company != null ? company.TENCT : null;
        }
    }
}
