using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO.Compression;
using _315HealthCareProject.DTO;

namespace _315HealthCareProject.Controllers
{
    [Route("api/")]
    [ApiController]
    public class CongTyBenhNhanController : ControllerBase
    {
        private readonly ICongTyBenhNhanService _service;

        public CongTyBenhNhanController(ICongTyBenhNhanService service)
        {
            _service = service;
        }

        [HttpGet("AllBenhNhan")]
        public async Task<ActionResult<IEnumerable<CongTyBenhNhan>>> GetAll()
        {
            var congTyBenhNhanList = await _service.GetAllAsync();
            return Ok(congTyBenhNhanList);
        }

        [HttpPost("AddBenhNhan")]
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

        [HttpPut("UpdateBenhNhan/{id}")]
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


        //[HttpPut("UpdateBenhNhan/{id}")]
        //public async Task<IActionResult> UpdateBenhNhan(int id, [FromBody] CongTyBenhNhan benhNhan, [FromForm] IFormFile pdfFile)
        //{
        //    if (id != benhNhan.IDBN)
        //    {
        //        return BadRequest("Invalid ID");
        //    }

        //    try
        //    {
        //        byte[] fileBytes = null;

        //        // Kiểm tra xem có file PDF được gửi lên không
        //        if (pdfFile != null && pdfFile.Length > 0)
        //        {
        //            using (var memoryStream = new MemoryStream())
        //            {
        //                // Đọc dữ liệu file PDF vào một mảng byte
        //                await pdfFile.CopyToAsync(memoryStream);
        //                fileBytes = memoryStream.ToArray();
        //            }
        //        }

        //        // Gọi phương thức UpdateBenhNhanAsync từ service và truyền cả thông tin bệnh nhân lẫn dữ liệu file PDF
        //        await _service.UpdateBenhNhanAsync(benhNhan, fileBytes);

        //        return Ok(benhNhan);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "An error occurred while updating bệnh nhân: " + ex.Message);
        //    }
        //}



        [HttpGet("FindByID/{id}")]
        public async Task<ActionResult<CongTyBenhNhan>> GetBenhNhanById(int id)
        {
            var benhNhan = await _service.GetBenhNhanByIdAsync(id);
            if (benhNhan == null)
            {
                return NotFound();
            }
            return Ok(benhNhan);
        }

        [HttpGet("findByName/{ten}")]
        public async Task<ActionResult<IEnumerable<CongTyBenhNhan>>> GetBenhNhanByTen(string ten)
        {
            var benhNhanList = await _service.GetBenhNhanByTenAsync(ten);
            if (benhNhanList == null || !benhNhanList.Any())
            {
                return NotFound();
            }
            return Ok(benhNhanList);
        }


        [HttpDelete("DeleteBenhNhan/{id}")]
        public async Task<IActionResult> DeleteBenhNhan(int id)
        {
            try
            {
                await _service.DeleteBenhNhanAsync(id);
                return Ok("Bệnh nhân đã được xóa thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while deleting bệnh nhân: " + ex.Message);
            }
        }

        [HttpGet("FindSoDienThoaiById/{id}")]
        public async Task<ActionResult<string>> GetSoDienThoaiById(int id)
        {
            try
            {
                var soDienThoai = await _service.GetSoDienThoaiByIdAsync(id);
                if (string.IsNullOrEmpty(soDienThoai))
                {
                    return NotFound("Không tìm thấy số điện thoại với ID " + id);
                }
                return Ok(soDienThoai);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while getting Số điện thoại: " + ex.Message);
            }
        }



        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<CongTyBenhNhan>>> GetBenhNhanAsync(string? keyword)
        {
            try
            {
                if (keyword == null) 
                {
                    var allBenhNhan = await _service.GetAllAsync();
                    return Ok(allBenhNhan);
                }
                else
                {
                    var benhNhanList = await _service.SearchBenhNhanAsync(keyword);
                    return Ok(benhNhanList);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

    }
} 
