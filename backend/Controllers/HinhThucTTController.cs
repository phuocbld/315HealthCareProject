using _315HealthCareProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HinhThucTTController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HinhThucTTController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetHinhThucs()
        {
            var hinhThucs = await _context.HinhThucs
                .Select(d => new { d.IdHinhThuc, d.TenHinhThuc })
                .ToListAsync();

            return Ok(hinhThucs);
        }
    }
}
