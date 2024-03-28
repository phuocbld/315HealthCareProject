using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using _315HealthCareProject.Models;
using Microsoft.EntityFrameworkCore;
using _315HealthCareProject.Data;
using _315HealthCareProject.Services;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController : ControllerBase
    {
        private readonly INhanVienService _nhanVienService;
        private readonly ApplicationDbContext _context;

        public NhanVienController(INhanVienService nhanVienService, ApplicationDbContext context)
        {
            _nhanVienService = nhanVienService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAlls()
        {
            var nhanViens = await _context.NhanViens
                .Select(d => new { d.ID, d.TENNV })
                .ToListAsync();

            return Ok(nhanViens);
        }


        [HttpGet("{id}")]
        public ActionResult<string> GetTenNhanVien(int id)
        {
            var tenNhanVien = _nhanVienService.GetTenNhanVien(id);

            return Ok(tenNhanVien);
        }

    }
}
