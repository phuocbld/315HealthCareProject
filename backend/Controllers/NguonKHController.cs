using _315HealthCareProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NguonKHController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NguonKHController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetNguonKHs()
        {
            var nguonKHs = await _context.NguonKHs
                .Select(n => new { n.IdNguonKH, n.Nguon })
                .ToListAsync();

            return Ok(nguonKHs);
        }
    }
}
