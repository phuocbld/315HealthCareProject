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
using System.Net;
using _315HealthCareProject.Data;
using _315HealthCareProject.Services;

namespace _315HealthCareProject.Controllers
{
    [Route("api/")]
    [ApiController]
    public class CongTyBenhNhanController : ControllerBase
    {
        private readonly ICongTyBenhNhanService _service;
        private readonly IFtpService _ftpService;
        private readonly ApplicationDbContext _context;

        public CongTyBenhNhanController(ICongTyBenhNhanService service, IFtpService ftpService, ApplicationDbContext context)
        {
            _service = service;
            _ftpService = ftpService;
            _context = context;
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
        public async Task<IActionResult> UpdateBenhNhan(int id, [FromForm] CongTyBenhNhanDTO benhNhanDTO)
        {
            try
            {
                if (id != benhNhanDTO.IDBN)
                {
                    return BadRequest("Invalid ID");
                }

                await _service.UpdateCongTyBenhNhan(benhNhanDTO);
                var benhNhan = await _service.GetBenhNhanByIdAsync(id);
                return Ok(benhNhan);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetFileBase64")]

        public IActionResult GetFile(string base64String)
        {
            if (string.IsNullOrEmpty(base64String))
            {
                return BadRequest("Invalid base64 string");
            }

            try
            {
                // Giải mã base64 thành mảng byte
                byte[] bytes = Convert.FromBase64String(base64String);

                string mimeType = "application/pdf";

                // Trả về file
                return File(bytes, mimeType);
            }
            catch (FormatException)
            {
                return BadRequest("Invalid base64 string");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("DownloadBenhNhanFiles/{maBN}")]
        public async Task<IActionResult> DownloadBenhNhanFiles(string maBN)
        {
            try
            {
                var benhNhanFiles = await _service.DownloadBenhNhanFileAsync(maBN);

                // Kiểm tra xem cả hai file có tồn tại không
                if (benhNhanFiles.KQXNFile == null || benhNhanFiles.KQKhamFile == null)
                {
                    return NotFound("Không tìm thấy file của bệnh nhân.");
                }

                // Ghi các file vào response dưới dạng ZIP
                using (var memoryStream = new MemoryStream())
                {
                    using (var zipArchive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                    {
                        // Thêm file KQXN vào ZIP
                        var entryKQXN = zipArchive.CreateEntry("KQXN.pdf");
                        using (var entryStream = entryKQXN.Open())
                        {
                            await entryStream.WriteAsync(benhNhanFiles.KQXNFile, 0, benhNhanFiles.KQXNFile.Length);
                        }

                        // Thêm file KQKham vào ZIP
                        var entryKQKham = zipArchive.CreateEntry("KQKham.pdf");
                        using (var entryStream = entryKQKham.Open())
                        {
                            await entryStream.WriteAsync(benhNhanFiles.KQKhamFile, 0, benhNhanFiles.KQKhamFile.Length);
                        }
                    }

                    memoryStream.Seek(0, SeekOrigin.Begin);
                    return File(memoryStream, "application/zip", "BenhNhanFiles.zip");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi tải file của bệnh nhân: {ex.Message}");
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
