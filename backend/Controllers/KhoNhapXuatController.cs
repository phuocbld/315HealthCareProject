
using System;
using Microsoft.AspNetCore.Mvc;
using _315HealthCareProject.Models;
using Microsoft.EntityFrameworkCore;
using _315HealthCareProject.Data;
using _315HealthCareProject.Services.Interface;
using _315HealthCareProject.DTO;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KhoNhapXuatController : ControllerBase
    {
        private readonly IKhoNhapXuatService _service;
        private readonly ApplicationDbContext _context;

        public KhoNhapXuatController(IKhoNhapXuatService service, ApplicationDbContext context)
        {
            _service = service;
            _context = context;
        }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteKhoNhapXuat(int id)
        //{
        //    try
        //    {
        //        await _khoNhapXuatService.DeleteKhoNhapXuatAsync(id);
        //        return Ok(new { message = "Xóa phiếu nhập/xuất thành công" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
        //    }

        //}

        [HttpPost]
        [Route("PhieuNhap")]
        public async Task<IActionResult> PostKhoNhap(KhoNhapXuat khoNhap)
        {
            try
            {
                var newKhoNhapTask = _service.CreateKhoNhap(
                    khoNhap.TenPhieu,
                    khoNhap.NoiDung,
                    khoNhap.TrangThai
                );

                var newKhoNhap = await newKhoNhapTask;

                newKhoNhap.GhiChu = khoNhap.GhiChu;
                newKhoNhap.NhanVienNhan = khoNhap.NhanVienNhan;
                newKhoNhap.NgayNhan = khoNhap.NgayNhan;
                newKhoNhap.IdKhoNhap = khoNhap.IdKhoNhap;
                newKhoNhap.IdKhoXuat = khoNhap.IdKhoXuat;
                newKhoNhap.NhanVienXuat = khoNhap.NhanVienXuat;
                newKhoNhap.NgayXuat = khoNhap.NgayXuat;
                newKhoNhap.IdDoiTac = khoNhap.IdDoiTac;
                newKhoNhap.DaNhan = khoNhap.DaNhan;
                newKhoNhap.SoHoaDon = khoNhap.SoHoaDon;
                newKhoNhap.NgayHoaDon = khoNhap.NgayHoaDon;
                newKhoNhap.LinkHoaDon = khoNhap.LinkHoaDon;
                newKhoNhap.FileHoaDon = khoNhap.FileHoaDon;
                newKhoNhap.IdHinhThuc = khoNhap.IdHinhThuc;
                newKhoNhap.IdPhuongThuc = khoNhap.IdPhuongThuc;

                _context.SaveChanges();
                return Ok(new { message = "Thêm phiếu nhập thành công", data = newKhoNhap });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("PhieuXuat")]
        public async Task<IActionResult> PostKhoXuat(KhoNhapXuat khoXuat)
        {
            try
            {
                var newKhoXuatTask = _service.CreateKhoXuat(
                      khoXuat.TenPhieu,

                      khoXuat.NoiDung,

                      khoXuat.TrangThai
  );

                var newKhoXuat = await newKhoXuatTask;

                newKhoXuat.GhiChu = khoXuat.GhiChu;
                newKhoXuat.NhanVienNhan = khoXuat.NhanVienNhan;
                newKhoXuat.NgayNhan = khoXuat.NgayNhan;
                newKhoXuat.IdKhoNhap = khoXuat.IdKhoNhap;
                newKhoXuat.IdKhoXuat = khoXuat.IdKhoXuat;
                newKhoXuat.NhanVienXuat = khoXuat.NhanVienXuat;
                newKhoXuat.NgayXuat = khoXuat.NgayXuat;
                newKhoXuat.IdDoiTac = khoXuat.IdDoiTac;
                newKhoXuat.DaNhan = khoXuat.DaNhan;
                newKhoXuat.SoHoaDon = khoXuat.SoHoaDon;
                newKhoXuat.NgayHoaDon = khoXuat.NgayHoaDon;
                newKhoXuat.LinkHoaDon = khoXuat.LinkHoaDon;
                newKhoXuat.FileHoaDon = khoXuat.FileHoaDon;
                newKhoXuat.IdHinhThuc = khoXuat.IdHinhThuc;
                newKhoXuat.IdPhuongThuc = khoXuat.IdPhuongThuc;


                _context.SaveChanges();

                return Ok(new
                {
                    message = "Thêm phiếu xuất thành công",
                    data = newKhoXuat
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }




        [HttpGet("phieunhap")]
        public async Task<IActionResult> GetAllPhieuNhap()
        {
            try
            {
                var phieuNhap = await _service.GetAllPhieuNhapAsync();
                return Ok(phieuNhap);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }

        [HttpGet("phieuxuat")]
        public async Task<IActionResult> GetAllPhieuXuat()
        {
            try
            {
                var phieuXuat = await _service.GetAllPhieuXuatAsync();
                return Ok(phieuXuat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }

        [HttpGet("phieunhapxuat")]
        public async Task<IActionResult> GetAllKhoNhapXuat()
        {
            try
            {
                var khoNhapXuat = await _service.GetAllKhoNhapXuatAsync();
                return Ok(khoNhapXuat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }


     

        [HttpGet("{id}")]
        public async Task<IActionResult> GetKhoNhapXuatById(int id)
        {
            try
            {
                var khoNhapXuat = await _service.GetKhoNhapXuatByIdAsync(id);
                if (khoNhapXuat == null)
                {
                    return NotFound($"Không tìm thấy KhoNhapXuat với ID {id}");
                }
                return Ok(khoNhapXuat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKhoNhapXuat(int id, [FromBody] KhoNhapXuat khoNhapXuat)
        {
            try
            {
                var updatedKhoNhapXuat = await _service.UpdateKhoNhapXuatAsync(id, khoNhapXuat);
                return Ok(updatedKhoNhapXuat);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }



        [HttpPut("Delete/{idNhapXuat}")]
        public async Task<IActionResult> UpdateCheckDelete(int idNhapXuat)
        {
            try
            {
                await _service.DeleteAsync(idNhapXuat);
                return Ok(new { message = "Cập nhật CheckDelete thành công." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }


        [HttpGet("FindPhieuNhapByCondition")]
        public async Task<IActionResult> GetPhieuNhapByConditions(DateTime? fromDate, DateTime? toDate, int? idChiNhanh)
        {
            try
            {
                IEnumerable<KhoNhapXuat> phieuNhap;

                if (idChiNhanh.HasValue)
                {
                    if (fromDate.HasValue && toDate.HasValue && fromDate.HasValue)
                    {
                        // Lấy thông tin phiếu nhập theo khoảng thời gian và chi nhánh
                        phieuNhap = await _service.GetPhieuNhapByTimeAndBranchAsync(fromDate.Value, toDate.Value, idChiNhanh.Value);
                    }
                    else
                    {
                        // Lấy thông tin phiếu nhập chỉ theo chi nhánh
                        phieuNhap = await _service.GetPhieuNhapByIdChiNhanhAsync(idChiNhanh.Value);
                    }
                }
                else
                {
                    if (fromDate.HasValue && toDate.HasValue)
                    {
                        // Lấy thông tin phiếu nhập theo khoảng thời gian
                        phieuNhap = await _service.GetPhieuNhapByTimeAsync(fromDate.Value, toDate.Value);
                    }
                    else
                    {
                        
                        phieuNhap = await _service.GetAllPhieuNhapAsync();
                    }
                }

                return Ok(phieuNhap);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }

        //[HttpGet("FindPhieuNhapByIdChiNhanh")]
        //public async Task<IActionResult> GetPhieuNhapByBranch(int idChiNhanh)
        //{
        //    try
        //    {
        //        var phieuNhap = await _service.GetPhieuNhapByIdChiNhanhAsync(idChiNhanh);
        //        return Ok(phieuNhap);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
        //    }
        //}

    }
}
