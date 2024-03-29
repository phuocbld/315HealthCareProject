
using System;
using Microsoft.AspNetCore.Mvc;
using _315HealthCareProject.Models;
using Microsoft.EntityFrameworkCore;
using _315HealthCareProject.Data;
using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KhoNhapXuatController : ControllerBase
    {
        private readonly IKhoNhapXuatService _khoNhapXuatService;
        private readonly ApplicationDbContext _context;

        public KhoNhapXuatController(IKhoNhapXuatService khoNhapXuatService, ApplicationDbContext context)
        {
            _khoNhapXuatService = khoNhapXuatService;
            _context = context;
        }

        [HttpPost]
        [Route("PhieuNhap")]
        public IActionResult PostKhoNhap(KhoNhapXuat khoNhap)
        {
            try
            {
                var newKhoNhap = _khoNhapXuatService.CreateKhoNhap(
                      khoNhap.TenPhieu,
                      khoNhap.NoiDung,
                      khoNhap.TrangThai

            );

                // Gán các trường dữ liệu không bắt buộc
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
        public IActionResult PostKhoXuat(KhoNhapXuat khoXuat)
        {
            try
            {
                var newKhoXuat = _khoNhapXuatService.CreateKhoXuat(
                      khoXuat.TenPhieu,

                      khoXuat.NoiDung,

                      khoXuat.TrangThai
  );

                // Gán các trường dữ liệu không bắt buộc
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
            var phieuNhap = await _khoNhapXuatService.GetAllPhieuNhapAsync();
            return Ok(phieuNhap);
        }

        [HttpGet("phieuxuat")]
        public async Task<IActionResult> GetAllPhieuXuat()
        {
            var phieuXuat = await _khoNhapXuatService.GetAllPhieuXuatAsync();
            return Ok(phieuXuat);
        }

        [HttpGet("phieunhapxuat")]
        public async Task<IActionResult> GetAllPhieuNhapXuat()
        {
            var phieuNhapXuat = await _khoNhapXuatService.GetAllPhieuNhapXuatAsync();
            return Ok(phieuNhapXuat);
        }
    }
}
        




    
