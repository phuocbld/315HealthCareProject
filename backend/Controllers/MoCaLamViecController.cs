using Microsoft.AspNetCore.Mvc;
using _315HealthCareProject.Models;
using _315HealthCareProject.Data;
using _315HealthCareProject.Services;
using System;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoCaLamViecController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ITimeComparisonService _timeComparisonService;

        public MoCaLamViecController(ApplicationDbContext context, ITimeComparisonService timeComparisonService)
        {
            _context = context;
            _timeComparisonService = timeComparisonService;
        }

        [HttpPost]
        public IActionResult PostDangNhap(DangNhap dangNhap)
        {
            if (dangNhap == null)
            {
                return BadRequest("Dữ liệu đăng nhập không hợp lệ.");
            }

            if (dangNhap.ThoiGianDangNhap == null)
            {
                return BadRequest("Thời gian đăng nhập không được bỏ trống.");
            }

            int idCaLamViec = _timeComparisonService.CompareTimeAndCalculateIDCaLamViec(dangNhap.ThoiGianDangNhap);

            if (idCaLamViec == 0)
            {

                return NotFound("Không tìm thấy ca làm việc phù hợp.");
            }

            dangNhap.IdCaLamViec = idCaLamViec;
            _context.DangNhaps.Add(dangNhap);
            _context.SaveChanges();

            return Ok(dangNhap);
        }
    }
}

