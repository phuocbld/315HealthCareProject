using _315HealthCareProject.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PhuongXaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PhuongXaController(ApplicationDbContext context)
        {
            _context = context;
        }


        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<object>>> GetPhuongXas()
        //{
        //    var Phuongs = await _context.PhuongXas
        //        .Select(d => new { d.IdPhuong, d.TenPhuong })
        //        .ToListAsync();

        //    return Ok(Phuongs);
        //}





        [HttpGet("{idQuan}")]
        public async Task<IActionResult> GetPhuongXaByQuanId(int idQuan)
        {
            var phuongXas = await _context.PhuongXas
                .Where(p => p.IdQuan == idQuan)
                .Select(p => new { p.IdPhuong, p.TenPhuong })
                .ToListAsync();

            return Ok(phuongXas);
        }


    }
}

