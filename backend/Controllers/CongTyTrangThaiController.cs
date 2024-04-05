using System.Collections.Generic;
using System.Threading.Tasks;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CongTyTrangThaiController : ControllerBase
    {
        private readonly ICongTyTrangThaiService _service;

        public CongTyTrangThaiController(ICongTyTrangThaiService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CongTyTrangThai>>> GetAll()
        {
            var congTyTrangThaiList = await _service.GetAllAsync();
            return Ok(congTyTrangThaiList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CongTyTrangThai>> GetById(int id)
        {
            var congTyTrangThai = await _service.GetByIdAsync(id);
            if (congTyTrangThai == null)
            {
                return NotFound();
            }
            return Ok(congTyTrangThai);
        }
    }
}
