using _315HealthCareProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanTocController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DanTocController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetDanTocs()
        {
            var danTocs = await _context.DanTocs
                .Select(d => new { d.IdDanToc, d.TenDanToc })
                .ToListAsync();

            return Ok(danTocs);
        }
    }
}
