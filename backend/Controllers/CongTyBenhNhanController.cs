using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO.Compression;
using _315HealthCareProject.DTO;
using System.Text;

namespace _315HealthCareProject.Controllers
{
    [Route("api/")]
    [ApiController]
    public class CongTyBenhNhanController : ControllerBase
    {
        private readonly ICongTyBenhNhanService _service;
        private readonly IFtpService _ftpService;

        public CongTyBenhNhanController(ICongTyBenhNhanService service, IFtpService ftpService)
        {
            _service = service;
            _ftpService = ftpService;
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
        [HttpGet]
        public IActionResult TestFtpConnection()
        {
            try
            {

                _ftpService.IsLoginValidAsync();
                return Ok("Kết nối đến FTP thành công!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi kết nối đến FTP: {ex.Message}");
            }
        }

        [HttpPut("UpdateBenhNhanPDF/{id}")]
        public async Task<IActionResult> UpdateBenhNhan(int id, [FromForm] CongTyBenhNhan benhNhan, [FromForm] IFormFile pdfFile, [FromQuery] string? fieldToUpdate)
        {
            if (id != benhNhan.IDBN)
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                if (pdfFile != null && pdfFile.Length > 0)
                {
                    byte[] fileBytes;
                    using (var memoryStream = new MemoryStream())
                    {
                        await pdfFile.CopyToAsync(memoryStream);
                        fileBytes = memoryStream.ToArray();
                    }

                    string remoteDirectory = fieldToUpdate == "KQXN" ? "KQXN" : "KQKham";
                    string remoteFileName = Guid.NewGuid().ToString() + Path.GetExtension(pdfFile.FileName);

                    // Upload file PDF lên máy chủ FTP
                    await _ftpService.UploadFileAsync(fileBytes, remoteFileName, remoteDirectory);

                    // Lưu đường dẫn FTP vào trường tương ứng trong đối tượng benhNhan
                    if (fieldToUpdate == "KQXN")
                    {
                        benhNhan.KQXN = Encoding.UTF8.GetBytes($"ftp://14.241.244.112:7777/{remoteDirectory}/{remoteFileName}");
                    }
                    else if (fieldToUpdate == "KQKham")
                    {
                        benhNhan.KQKHAM = Encoding.UTF8.GetBytes($"ftp://14.241.244.112:7777/{remoteDirectory}/{remoteFileName}");
                    }
                }

                // Gọi service để cập nhật thông tin bệnh nhân
                await _service.UpdateBenhNhanAsync(benhNhan);

                return Ok(benhNhan);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating bệnh nhân: " + ex.Message);
            }
        }




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
