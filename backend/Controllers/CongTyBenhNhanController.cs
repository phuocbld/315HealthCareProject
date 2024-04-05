using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CongTyBenhNhanController : ControllerBase
    {
        private readonly ICongTyBenhNhanService _service;

        public CongTyBenhNhanController(ICongTyBenhNhanService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CongTyBenhNhan>>> GetAll()
        {
            var congTyBenhNhanList = await _service.GetAllAsync();
            return Ok(congTyBenhNhanList);
        }

        [HttpPost]
        public async Task<IActionResult> AddBenhNhanList(List<CongTyBenhNhan> benhNhanList)
        {
            try
            {
                await _service.AddBenhNhanListAsync(benhNhanList);
                return Ok(benhNhanList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while adding bệnh nhân: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBenhNhan(int id, CongTyBenhNhan benhNhan)
        {
            if (id != benhNhan.IDBN)
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                await _service.UpdateBenhNhanAsync(benhNhan);
                return Ok(benhNhan);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating bệnh nhân: " + ex.Message);
            }
        }

    }
}
