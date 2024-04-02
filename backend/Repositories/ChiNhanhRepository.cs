
namespace _315HealthCareProject.Repositories;
using _315HealthCareProject.Data;
using _315HealthCareProject.DTO;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

public class ChiNhanhRepository : IChiNhanhRepository
{
    private readonly ApplicationDbContext _context;

    public ChiNhanhRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<string?> GetTenChiNhanhByIdAsync(int idChiNhanh)
    {
        var tenChiNhanh = await _context.ChiNhanhs
            .Where(c => c.IdChiNhanh == idChiNhanh)
            .Select(c => c.TenChiNhanh)
            .FirstOrDefaultAsync();

        return tenChiNhanh;
    }


    public async Task<IEnumerable<ChiNhanhDTO>> GetAllChiNhanhAsync()
    {
        return await _context.ChiNhanhs
            .Select(c => new ChiNhanhDTO
            {
                IdChiNhanh = c.IdChiNhanh,
                TenChiNhanh = c.TenChiNhanh
            })
            .ToListAsync();
    }
}

