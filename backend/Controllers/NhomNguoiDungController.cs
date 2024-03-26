using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using _315HealthCareProject.Services;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NhomNguoiDungController : ControllerBase
    {
        private readonly INhomNguoiDungService _nhomNguoiDungService;

        public NhomNguoiDungController(INhomNguoiDungService nhomNguoiDungService)
        {
            _nhomNguoiDungService = nhomNguoiDungService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTenNhomById(int id)
        {
            var tenNhom = await _nhomNguoiDungService.GetTenNhomByIdAsync(id);
            if (tenNhom == null)
            {
                return NotFound();
            }

            return Ok(tenNhom);
        }
    }
}
