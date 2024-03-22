//using Microsoft.AspNetCore.Mvc;
//using _315HealthCareProject.Models;
//using System;
//using System.Threading.Tasks;
//using _315HealthCareProject.Data;

//namespace _315HealthCareProject.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class DangNhapController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public DangNhapController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpPost]
//        public async Task<IActionResult> PostDangNhap([FromBody] DangNhap dangNhap)
//        {
//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }

//            try
//            {
//                _context.DangNhaps.Add(dangNhap);
//                await _context.SaveChangesAsync();

//                return Ok(new { message = "DangNhap data saved successfully" });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, new { message = $"Error saving DangNhap data: {ex.Message}" });
//            }
//        }
//    }
//}
using Microsoft.EntityFrameworkCore;
using _315HealthCareProject.Models;
using System;
using _315HealthCareProject.Data;
using Microsoft.AspNetCore.Mvc;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DangNhapController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DangNhapController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult PostDangNhap(DangNhap dangNhap)
        {
            // Lấy thời gian gửi từ frontend
            var thoiGianDangNhap = dangNhap.ThoiGianDangNhap;

            // Tính toán IDCaLamViec dựa trên thời gian DangNhap
            var gioDangNhap = thoiGianDangNhap.TimeOfDay;

            int idCaLamViec;
            if (gioDangNhap >= new TimeSpan(7, 30, 0) && gioDangNhap < new TimeSpan(8, 30, 0))
            {
                idCaLamViec = 1;
            }
            else if (gioDangNhap >= new TimeSpan(11, 30, 0) && gioDangNhap < new TimeSpan(12, 30, 0))
            {
                idCaLamViec = 2;
            }
            else if (gioDangNhap >= new TimeSpan(16, 30, 0) && gioDangNhap < new TimeSpan(17, 30, 0))
            {
                idCaLamViec = 3;
            }
            else
            {
                // Nếu không tìm thấy ca làm việc phù hợp
                return NotFound("Không tìm thấy ca làm việc phù hợp.");
            }

            // Lưu thông tin đăng nhập và IDCaLamViec vào cơ sở dữ liệu
            dangNhap.IdCaLamViec = idCaLamViec;
            _context.DangNhaps.Add(dangNhap);

            try
            {
                _context.SaveChanges();
                return Ok("Lưu thông tin đăng nhập thành công.");
            }
            catch (Exception ex)
            {
                // Xử lý lỗi khi lưu dữ liệu vào cơ sở dữ liệu
                return StatusCode(500, "Lỗi khi lưu dữ liệu vào cơ sở dữ liệu: " + ex.Message);
            }
        }

    }
}

