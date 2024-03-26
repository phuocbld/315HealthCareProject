
using Microsoft.AspNetCore.Mvc;
using _315HealthCareProject.Models;
using _315HealthCareProject.Data;
using _315HealthCareProject.DTO;
using _315HealthCareProject.Services;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IDangNhapService _dangNhapService;
        private readonly INhanVienService _nhanvienService;
        private readonly INhomNguoiDungService _nhomNguoiDungService;

        public AuthController(ApplicationDbContext context, IDangNhapService dangNhapService , INhanVienService nhanVienService, INhomNguoiDungService nhomNguoiDungService)
        {
            _context = context;
            _dangNhapService = dangNhapService;
            _nhanvienService = nhanVienService;
            _nhomNguoiDungService = nhomNguoiDungService;
            _nhomNguoiDungService = nhomNguoiDungService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO request)
        {
            var userInfo = _context.THONGTINDANGNHAP
                .SingleOrDefault(u => u.TaiKhoan == request.Username && u.MatKhau == request.Password);
            

            if (userInfo == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            var dangNhap = await _dangNhapService.CheckAndCreateDangNhapAsync(userInfo.TaiKhoan , request.ChiNhanh_DangNhap);
            var tenNhom = await _nhomNguoiDungService.GetTenNhomByIdAsync(userInfo.IdNhom ?? 0);
            return Ok(new { userInfo.TaiKhoan, userInfo.TenNV, tenNhom, DangNhap = dangNhap });
        }
    }
}
