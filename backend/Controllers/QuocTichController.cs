using _315HealthCareProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuocTichController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuocTichController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetQuocTichs()
        {
            var quocTichs = await _context.QuocTichs
                .Select(q => new { q.IdQuocTich, q.TenQuocTich })
                .ToListAsync();

            return Ok(quocTichs);
        }
    }
}
