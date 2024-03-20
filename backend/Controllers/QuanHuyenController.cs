using System.Collections.Generic;
using System.Threading.Tasks;
using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuanHuyenController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuanHuyenController(ApplicationDbContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetQuanHuyens()
        {
            var quanHuyens = await _context.QuanHuyens
                .Select(q => new { q.IdQuan, q.TenQuan })
                .ToListAsync();

            return Ok(quanHuyens);
        }

        [HttpGet("{idTinh}")]
        public async Task<IActionResult> GetQuanHuyenByTinhId(int idTinh)
        {
            var quanHuyens = await _context.QuanHuyens
                .Where(q => q.IdTinh == idTinh)
                .Select(q => new { q.IdQuan, q.TenQuan })
                .ToListAsync();

            return Ok(quanHuyens);
        }

    }
}
