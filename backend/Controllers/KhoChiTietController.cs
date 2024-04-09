

using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KhoChiTietController : ControllerBase
    {
        private readonly IKhoChiTietService _khoChiTietService;

        public KhoChiTietController(IKhoChiTietService khoChiTietService)
        {
            _khoChiTietService = khoChiTietService;
        }

        [HttpPost]
        public async Task<IActionResult> AddKhoChiTietList(List<KhoChiTiet> khoChiTietList)
        {
            try
            {
                await _khoChiTietService.AddKhoChiTietListAsync(khoChiTietList);
                return Ok(khoChiTietList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while adding kho chi tiet: " + ex.Message);
            }
        }
       
    }
}
