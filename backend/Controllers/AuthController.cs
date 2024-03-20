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