using _315HealthCareProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhuongThucTTController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PhuongThucTTController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetDanTocs()
        {
            var phuongThucs = await _context.PhuongThucThanhToans
                .Select(d => new { d.IDPhuongThuc, d.PhuongThuc })
                .ToListAsync();

            return Ok(phuongThucs);
        }
    }
}
