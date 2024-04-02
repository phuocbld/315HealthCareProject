using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NguoiDungController : ControllerBase
    {
        private readonly INguoiDungService _nguoiDungService;

        public NguoiDungController(INguoiDungService nguoiDungService)
        {
            _nguoiDungService = nguoiDungService;
        }

        [HttpGet]
        [Route("user/{username}")]
        public async Task<IActionResult> GetChiNhanhIdByTaiKhoan(string username)
        {
            var chiNhanhId = await _nguoiDungService.GetChiNhanhIdByTaiKhoan(username);

            if (chiNhanhId == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(new { IdChiNhanh = chiNhanhId , TaiKhoan = username});
        }

        [HttpGet]
        [Route("id/{username}")]
        public async Task<IActionResult> GetIdNguoiDungByTaiKhoan(string username)
        {
            var idNguoiDung = await _nguoiDungService.GetIdNguoiDungByTaiKhoan(username);

            if (idNguoiDung == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(new {IDND = idNguoiDung });
        }
    }
}

