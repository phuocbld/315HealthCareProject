namespace _315HealthCareProject.Repositories;
using _315HealthCareProject.Models;
using _315HealthCareProject.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class CaLamViecRepository : ICaLamViecRepository
{
    private readonly ApplicationDbContext _context;

    public CaLamViecRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CaLamViec>> GetAllAsync()
    {
        return await _context.CaLamViecs.ToListAsync();
    }
}