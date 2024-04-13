using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [Route("api/tinh")]
    [ApiController]
    public class TinhTPController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TinhTPController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetTinhTPs()
        {
            var result = await _context.TinhTps
                .Select(t => new { IdTinh = t.IdTinh, TenTinh = t.TenTinh })
                .ToListAsync();
            return result;
        }



    }
}
