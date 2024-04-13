using Microsoft.AspNetCore.Mvc;
using _315HealthCareProject.Models;
using _315HealthCareProject.Data;
using _315HealthCareProject.DTO;
using System;
using System.Threading.Tasks;
using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DangNhapController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IDangNhapService _dangNhapService;
        private readonly ITimeComparisonService _timeComparisonService;

        public DangNhapController(ApplicationDbContext context, IDangNhapService dangNhapService, ITimeComparisonService timeComparisonService)
        {
            _context = context;
            _dangNhapService = dangNhapService;
            _timeComparisonService = timeComparisonService;
        }

        [HttpPost]
        [Route("MoCa")]
        public async Task<IActionResult> UpdateDangNhap([FromBody] DangNhapDTO dangNhapDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Kiểm tra xem DangNhap có tồn tại không
                var existingDangNhap = await _dangNhapService.GetByIdAsync(dangNhapDTO.IdDangNhap);
                if (existingDangNhap == null)
                {
                    return NotFound("DangNhap not found");
                }

                // Kiểm tra xem thông tin đăng nhập có hợp lệ không
                int idCaLamViec = _timeComparisonService.CompareTimeAndCalculateIDCaLamViec(dangNhapDTO.ThoiGianDangNhap);
                if (idCaLamViec == 0)
                {
                    return BadRequest("Invalid login time");
                }
                existingDangNhap.ThoiGianDangNhap = dangNhapDTO.ThoiGianDangNhap;
                existingDangNhap.IP = dangNhapDTO.IP;
                existingDangNhap.GhiChu = dangNhapDTO.GhiChu;
                existingDangNhap.IdPK = dangNhapDTO.IdPK;
                existingDangNhap.IdChiNhanh = dangNhapDTO.IdChiNhanh;
                existingDangNhap.IdCaLamViec = idCaLamViec;

                await _dangNhapService.UpdateAsync(existingDangNhap);

                return Ok(existingDangNhap);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("DongCa")]
        public async Task<IActionResult> CloseSession(int idDangNhap)
        {
            try
            {
                // Kiểm tra xem IDDangNhap có tồn tại không
                var existingDangNhap = await _dangNhapService.GetByIdAsync(idDangNhap);
                if (existingDangNhap == null)
                {
                    return NotFound("DangNhap not found");
                }

                
                if (existingDangNhap.ThoiGianDangNhap == null || existingDangNhap.DangXuat != null)
                {
                    return BadRequest("Invalid session to close");
                }

                
                existingDangNhap.DangXuat = DateTime.UtcNow;

                await _dangNhapService.UpdateAsync(existingDangNhap);

                return Ok("Đã đóng ca thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
