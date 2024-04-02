using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhoChiNhanhController : ControllerBase
    {
        private readonly IKhoChiNhanhService _service;

        public KhoChiNhanhController(IKhoChiNhanhService service)
        {
            _service = service;
        }

        [HttpGet("{idChiNhanh}")]
        public async Task<IActionResult> GetKhoInfoByChiNhanhId(int idChiNhanh)
        {
            var khoInfos = await _service.GetKhoInfoByChiNhanhIdAsync(idChiNhanh);

            if (khoInfos == null || !khoInfos.Any())
            {
                return NotFound("Không tìm thấy kho trong chi nhánh");
            }

            return Ok(khoInfos);
        }
    }
}
