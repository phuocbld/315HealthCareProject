using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oracle.ManagedDataAccess.Client;
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
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public ThuocVatTuController(IThuocVatTuService service, IConfiguration configuration, ApplicationDbContext context)
        {
            _service = service;
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetAll()
        {
            try
            {
                var thuocVatTus = await _service.GetAllThuocVatTuAsync();
                var result = thuocVatTus.Select(t => new { t.IdThuoc, t.MaThuoc, t.TenBietDuoc });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching data: " + ex.Message);
            }
        }




        [HttpGet("{idthuoc}")]
        public IActionResult Get(string idthuoc)
        {
            try
            {
                string connectionString = _configuration.GetConnectionString("OracleDBConnection");
                string query = "SELECT * FROM THUOCVATTU WHERE IDTHUOC = :idthuoc";

                using (OracleConnection connection = new OracleConnection(connectionString))
                {
                    using (OracleCommand command = new OracleCommand(query, connection))
                    {
                        command.Parameters.Add("idthuoc", OracleDbType.Int32).Value = Convert.ToInt32(idthuoc);

                        connection.Open();

                        OracleDataReader reader = command.ExecuteReader();

                        if (reader.Read())
                        {
                            Dictionary<string, object> data = new Dictionary<string, object>();

                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                string columnName = reader.GetName(i);
                                object value = reader.IsDBNull(i) ? null : reader.GetValue(i);
                                data.Add(columnName, value);
                            }

                            return Ok(data);
                        }
                        else
                        {
                            return NotFound(new { message = "Không tìm thấy thông tin cho idthuoc này" });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("/find/{id}")]
        public async Task<IActionResult> GetThuocVatTuById(int id)
        {
            try
            {
                var thuocVatTu = await _service.GetThuocVatTuByIdAsync(id);
                if (thuocVatTu == null)
                {
                    return NotFound($"Không tìm thấy ThuocVatTu với ID {id}");
                }
                return Ok(thuocVatTu);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }

        [HttpDelete("{idthuoc}")]
        public IActionResult Delete(string idthuoc)
        {
            try
            {
                string connectionString = _configuration.GetConnectionString("OracleDBConnection");
                string query = $"DELETE FROM THUOCVATTU WHERE IDTHUOC = :idthuoc";

                using (OracleConnection connection = new OracleConnection(connectionString))
                {
                    using (OracleCommand command = new OracleCommand(query, connection))
                    {
                        command.Parameters.Add("idthuoc", OracleDbType.Int32).Value = Convert.ToInt32(idthuoc);

                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(new { message = "Xóa thành công bản ghi có IDThuoc: " + idthuoc });
                        }
                        else
                        {
                            return NotFound(new { message = "Không tìm thấy bản ghi có IDThuoc: " + idthuoc });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }



        [HttpPost]
        [Route("ThemThuocVatTu")]
        public async Task<IActionResult> AddThuoc(ThuocVatTu thuocVatTu)
        {
            try
            {
                var newThuocVatTuTask = _service.CreateThuocVatTu(
                    thuocVatTu.MaThuoc,
                    thuocVatTu.TenBietDuoc,
                    thuocVatTu.TenHoatChat,
                    thuocVatTu.Dvt

                );

                var newThuocVatTu = await newThuocVatTuTask;
                newThuocVatTu.IdNhom = thuocVatTu.IdNhom;
                newThuocVatTu.IdCt = thuocVatTu.IdCt;
                newThuocVatTu.QuyCach = thuocVatTu.QuyCach;
                newThuocVatTu.DonGia = thuocVatTu.DonGia;
                newThuocVatTu.NongDo = thuocVatTu.NongDo;
                newThuocVatTu.HamLuong = thuocVatTu.HamLuong;
                newThuocVatTu.DuongDung = thuocVatTu.DuongDung;
                newThuocVatTu.NuocSanXuat = thuocVatTu.NuocSanXuat;
                newThuocVatTu.NhaSanXuat = thuocVatTu.NhaSanXuat;
                newThuocVatTu.SuDung = thuocVatTu.SuDung;
                newThuocVatTu.GhiChu = thuocVatTu.GhiChu;
                newThuocVatTu.IdCt = thuocVatTu.IdCt;
                newThuocVatTu.Barcode = thuocVatTu.Barcode;
                newThuocVatTu.QrCode = thuocVatTu.QrCode;
                newThuocVatTu.CachDung = thuocVatTu.CachDung;
                newThuocVatTu.MaSoDangKy = thuocVatTu.MaSoDangKy;
                newThuocVatTu.DonViChan = thuocVatTu.DonViChan;
                newThuocVatTu.ChuyenKhoa = thuocVatTu.ChuyenKhoa;
                newThuocVatTu.TenDoiTac = thuocVatTu.TenDoiTac;
                newThuocVatTu.DonViDung = thuocVatTu.DonViDung;
                newThuocVatTu.NguoiTao = thuocVatTu.NguoiTao;
                newThuocVatTu.NgayTao = thuocVatTu.NgayTao;
                newThuocVatTu.NguoiCapNhat = thuocVatTu.NguoiCapNhat;
                newThuocVatTu.NgayCapNhat = thuocVatTu.NgayCapNhat;
                newThuocVatTu.PtVatNhap = thuocVatTu.PtVatNhap;
                newThuocVatTu.PtVatBanLe = thuocVatTu.PtVatBanLe;
                newThuocVatTu.PtVatToa = thuocVatTu.PtVatToa;
                newThuocVatTu.QuyCachDongGoi = thuocVatTu.QuyCachDongGoi;

                _context.SaveChanges();

                return Ok(new { message = "Thêm Thuốc/Vật Tư thành công", data = newThuocVatTu });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateThuocVatTu(int id, [FromBody] ThuocVatTu thuocVatTu)
        {
            try
            {
                var updatedThuocVatTu = await _service.UpdateThuocVatTuAsync(id, thuocVatTu);
                return Ok(updatedThuocVatTu);
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



        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<ThuocVatTu>>> GetThuocVatTuAsync(string? keyword)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(keyword))
                {
                    var allThuocVatTu = await _service.GetLazyLoadedAsync();
                    return Ok(allThuocVatTu);
                }
                else
                {
                    var thuocVatTuList = await _service.SearchThuocVatTuAsync(keyword);
                    return Ok(thuocVatTuList);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


        [HttpGet("AllThuoc")]
        public async Task<ActionResult<IEnumerable<ThuocVatTu>>> GetAllThuocLazy()
        {
            try
            {
                var data = await _service.GetLazyLoadedAsync();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }



    }

}


