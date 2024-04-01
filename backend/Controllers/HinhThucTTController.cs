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

        [HttpGet("HinhThuc")]
        public async Task<ActionResult<IEnumerable<object>>> GetHinhThucThanhToan()
        {
            var hinhThucThanhToan = await _context.HinhThucs
                .Where(ht => ht.IdHinhThuc == 1 || ht.IdHinhThuc == 2)
                .Select(ht => new { ht.IdHinhThuc, ht.TenHinhThuc })
                .ToListAsync();

            return Ok(hinhThucThanhToan);
        }


    }
}
