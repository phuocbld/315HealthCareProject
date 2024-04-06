using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CongTyTrangThaiSMSController : ControllerBase
    {
        private readonly ICongTyTrangThaiSMSService _service;

        public CongTyTrangThaiSMSController(ICongTyTrangThaiSMSService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var trangThaiSMSTs = await _service.GetAllAsync();
            return Ok(trangThaiSMSTs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var trangThaiSMS = await _service.GetByIdAsync(id);

            if (trangThaiSMS == null)
            {
                return NotFound();
            }

            return Ok(trangThaiSMS);
        }

        [HttpGet("ten-trang-thai/{id}")]
        public async Task<IActionResult> GetTenTrangThaiSMSByIdAsync(int id)
        {
            var tenTrangThaiSMS = await _service.GetTenTrangThaiSMSByIdAsync(id);

            if (tenTrangThaiSMS == null)
            {
                return NotFound();
            }

            return Ok(tenTrangThaiSMS);
        }
    }
}
