using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThuocVatTuController : ControllerBase
    {
        private readonly IThuocVatTuService _service;

        public ThuocVatTuController(IThuocVatTuService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAll()
        {
            try
            {
                var thuocVatTus = await _service.GetAllThuocVatTuAsync();
                // Chọn các thuộc tính cần trả về
                var result = thuocVatTus.Select(t => new { t.IdThuoc, t.MaThuoc, t.TenBietDuoc });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching data: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ThuocVatTu>> GetById(int id)
        {
            try
            {
                var thuocVatTu = await _service.GetThuocVatTuByIdAsync(id);
                if (thuocVatTu == null)
                {
                    return NotFound("Không tìm thấy thuốc vật tư với ID: " + id);
                }

                return Ok(thuocVatTu);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching data: " + ex.Message);
            }
        }

    }
}