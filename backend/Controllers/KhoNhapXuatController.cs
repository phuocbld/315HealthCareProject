
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
        private readonly IKhoNhapXuatService _service;
        private readonly ApplicationDbContext _context;

        public KhoNhapXuatController(IKhoNhapXuatService service, ApplicationDbContext context)
        {
            _service = service;
            _context = context;
        }

        //[HttpPost]
        //[Route("PhieuNhap")]
        //public IActionResult PostKhoNhap(KhoNhapXuat khoNhap)
        //{
        //    try
        //    {
        //        var newKhoNhap = _service.CreateKhoNhap(
        //              khoNhap.TenPhieu,
        //              khoNhap.NoiDung,
        //              khoNhap.TrangThai

        //    );

        //        // Gán các trường dữ liệu không bắt buộc
        //        newKhoNhap.GhiChu = khoNhap.GhiChu;
        //        newKhoNhap.NhanVienNhan = khoNhap.NhanVienNhan;
        //        newKhoNhap.NgayNhan = khoNhap.NgayNhan;
        //        newKhoNhap.IdKhoNhap = khoNhap.IdKhoNhap;
        //        newKhoNhap.IdKhoXuat = khoNhap.IdKhoXuat;
        //        newKhoNhap.NhanVienXuat = khoNhap.NhanVienXuat;
        //        newKhoNhap.NgayXuat = khoNhap.NgayXuat;
        //        newKhoNhap.IdDoiTac = khoNhap.IdDoiTac;
        //        newKhoNhap.DaNhan = khoNhap.DaNhan;
        //        newKhoNhap.SoHoaDon = khoNhap.SoHoaDon;
        //        newKhoNhap.NgayHoaDon = khoNhap.NgayHoaDon;
        //        newKhoNhap.LinkHoaDon = khoNhap.LinkHoaDon;
        //        newKhoNhap.FileHoaDon = khoNhap.FileHoaDon;


        //        _context.SaveChanges();

        //        return Ok(new { message = "Thêm phiếu nhập thành công", data = newKhoNhap });

        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
        //    }
        //}


        //      [HttpPost]
        //      [Route("PhieuXuat")]
        //      public IActionResult PostKhoXuat(KhoNhapXuat khoXuat)
        //      {
        //          try
        //          {
        //              var newKhoXuat = _service.CreateKhoXuat(
        //                    khoXuat.TenPhieu,

        //                    khoXuat.NoiDung,

        //                    khoXuat.TrangThai
        //);

        //              // Gán các trường dữ liệu không bắt buộc
        //              newKhoXuat.GhiChu = khoXuat.GhiChu;
        //              newKhoXuat.NhanVienNhan = khoXuat.NhanVienNhan;
        //              newKhoXuat.NgayNhan = khoXuat.NgayNhan;
        //              newKhoXuat.IdKhoNhap = khoXuat.IdKhoNhap;
        //              newKhoXuat.IdKhoXuat = khoXuat.IdKhoXuat;
        //              newKhoXuat.NhanVienXuat = khoXuat.NhanVienXuat;
        //              newKhoXuat.NgayXuat = khoXuat.NgayXuat;
        //              newKhoXuat.IdDoiTac = khoXuat.IdDoiTac;
        //              newKhoXuat.DaNhan = khoXuat.DaNhan;
        //              newKhoXuat.SoHoaDon = khoXuat.SoHoaDon;
        //              newKhoXuat.NgayHoaDon = khoXuat.NgayHoaDon;
        //              newKhoXuat.LinkHoaDon = khoXuat.LinkHoaDon;
        //              newKhoXuat.FileHoaDon = khoXuat.FileHoaDon;


        //              _context.SaveChanges();

        //              return Ok(new
        //              {
        //                  message = "Thêm phiếu xuất thành công",
        //                  data = newKhoXuat
        //              });

        //          }
        //          catch (Exception ex)
        //          {
        //              return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
        //          }
        //      }
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
        public async Task<IActionResult> GetAllPhieuNhapXuat()
        {
            try
            {
                var phieuNhapXuat = await _service.GetAllPhieuNhapXuatAsync();
                return Ok(phieuNhapXuat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }
    }
}


        




    
