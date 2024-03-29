using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoiTacController : ControllerBase
    {
        private readonly IDoiTacService _service;

        public DoiTacController(IDoiTacService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var doitac = await _service.GetAllAsync();
            return Ok(doitac);
        }

        [HttpGet("MaDoiTac/{maDoiTac}")]
        public async Task<IActionResult> GetDoiTacByMaDoiTac(string maDoiTac)
        {
            var doiTac = await _service.GetDoiTacByMaDoiTacAsync(maDoiTac);

            if (doiTac == null)
            {
                return NotFound();
            }

            return Ok(doiTac);
        }

        [HttpGet("TenDoiTac/{tenDoiTac}")]
        public async Task<IActionResult> GetDoiTacByTenDoiTac(string tenDoiTac)
        {
            var doiTac = await _service.GetDoiTacByTenDoiTacAsync(tenDoiTac);

            if (doiTac == null)
            {
                return NotFound();
            }

            return Ok(doiTac);
        }

        [HttpGet("IdDoiTac/{idDoiTac}")]
        public async Task<IActionResult> GetDoiTacByIdDoiTac(int idDoiTac)
        {
            var doiTac = await _service.GetDoiTacByIdAsync(idDoiTac);

            if (doiTac == null)
            {
                return NotFound();
            }

            return Ok(doiTac);
        }
    }
}
