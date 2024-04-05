using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CongTyKhachKhamDoanController : ControllerBase
    {
        private readonly ICongTyKhachKhamDoanService _service;

        public CongTyKhachKhamDoanController(ICongTyKhachKhamDoanService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CongTyKhachKhamDoan>>> GetAll()
        {
            var congTyKhachKhamDoanList = await _service.GetAllAsync();
            return Ok(congTyKhachKhamDoanList);
        }

        [HttpPost]
        public async Task<ActionResult<CongTyKhachKhamDoan>> AddCongTyKhachKhamDoan(CongTyKhachKhamDoan congTyKhachKhamDoan)
        {
            var newCongTyKhachKhamDoan = await _service.AddAsync(congTyKhachKhamDoan);
            return CreatedAtAction(nameof(GetAll), new { id = newCongTyKhachKhamDoan.IDCT }, newCongTyKhachKhamDoan);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CongTyKhachKhamDoan>> GetById(int id)
        {
            var congTyKhachKhamDoan = await _service.GetByIdAsync(id);
            if (congTyKhachKhamDoan == null)
            {
                return NotFound();
            }
            return Ok(congTyKhachKhamDoan);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CongTyKhachKhamDoan>> Update(int id, CongTyKhachKhamDoan congTyKhachKhamDoan)
        {
            if (id != congTyKhachKhamDoan.IDCT)
            {
                return BadRequest();
            }

            var existingCongTyKhachKhamDoan = await _service.GetByIdAsync(id);
            if (existingCongTyKhachKhamDoan == null)
            {
                return NotFound("Không tìm thấy Công Ty");
            }

            try
            {
                var updatedCongTyKhachKhamDoan = await _service.UpdateAsync(id, congTyKhachKhamDoan);
                return Ok(updatedCongTyKhachKhamDoan);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
