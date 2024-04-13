using _315HealthCareProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NgheNghiepController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NgheNghiepController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetNgheNghieps()
        {
            var ngheNghieps = await _context.NgheNghieps
                .Select(n => new { n.IdNN, n.TenNN })
                .ToListAsync();

            return Ok(ngheNghieps);
        }
    }
}
