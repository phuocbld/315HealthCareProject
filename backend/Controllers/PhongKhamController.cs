using _315HealthCareProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhongKhamController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PhongKhamController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPhongKhams()
        {
            var phongKhams = await _context.PhongKhams
                .Select(d => new { d.IdPK, d.MaPK, d.TenPK  })
                .ToListAsync();

            return Ok(phongKhams);
        }
    }
}
