using Microsoft.AspNetCore.Mvc;
using _315HealthCareProject.Models;
using System.Linq;
using Microsoft.AspNetCore.Identity.Data;
using _315HealthCareProject.Data;
using _315HealthCareProject.DTO;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginDTO request)
        {
            var user = _context.NguoiDungs
                .SingleOrDefault(u => u.TaiKhoan == request.Username && u.MatKhau == request.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            return Ok(user);
        }
    }
}

//using Microsoft.AspNetCore.Mvc;
//using _315HealthCareProject.Models;
//using _315HealthCareProject.DTO;
//using _315HealthCareProject.Data;
//using System;

//namespace _315HealthCareProject.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class AuthController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public AuthController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpPost]
//        [Route("login")]
//        public IActionResult Login([FromBody] LoginDTO request)
//        {
//            var user = _context.NguoiDungs
//                .SingleOrDefault(u => u.TaiKhoan == request.Username && u.MatKhau == request.Password);

//            if (user == null)
//            {
//                return Unauthorized(new { message = "Invalid username or password" });
//            }

//            Lấy thông tin từ request gửi từ phía front - end
//            var ipAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString(); // Địa chỉ IP của client
//            var currentTime = DateTime.Now;

//            Tạo đối tượng DangNhap
//            var dangNhap = new DangNhap
//            {
//                IdNguoiDung = user.IdNguoiDung,
//                ThoiGianDangNhap = currentTime,
//                DangXuat = DateTime.MaxValue, // Khởi tạo giá trị DangXuat với giá trị lớn nhất của kiểu DateTime
//                IP = ipAddress,
//                GhiChu = request.GhiChu,
//                IdPK = request.IdPK, // Sử dụng thông tin từ request
//                IdCaLamViec = request.IdCaLamViec, // Sử dụng thông tin từ request
//                IdChiNhanh = request.IdChiNhanh // Sử dụng thông tin từ request
//            };

//            Lưu thông tin đăng nhập vào cơ sở dữ liệu
//            _context.DangNhaps.Add(dangNhap);
//            _context.SaveChanges();

//            return Ok(user);
//        }
//    }
//}
