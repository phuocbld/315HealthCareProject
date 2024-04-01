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

        public ThuocVatTuController(IThuocVatTuService service , IConfiguration configuration)
        {
            _service = service;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAll()
        {
            try
            {
                var thuocVatTus = await _service.GetAllThuocVatTuAsync();
                // Chọn các thuộc tính cần trả về
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

    }
}