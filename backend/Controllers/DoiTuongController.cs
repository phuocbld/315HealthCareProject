using _315HealthCareProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DoiTuongController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DoiTuongController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetDoiTuongs()
        {
            var doiTuongs = await _context.DoiTuongs
                .Select(d => new { d.IdDoiTuong, d.TenDoiTuong })
                .ToListAsync();

            return Ok(doiTuongs);
        }
    }
}

