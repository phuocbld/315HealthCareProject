namespace _315HealthCareProject.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using _315HealthCareProject.Services.Interface;

[ApiController]
[Route("api/[controller]")]
public class ChiNhanhController : ControllerBase
{
    private readonly IChiNhanhService _service;
    private readonly INguoiDungService _nguoiDungService; 

    public ChiNhanhController(IChiNhanhService service , INguoiDungService nguoiDungService)
    {
        _service = service;
        _nguoiDungService = nguoiDungService;
    }

    [HttpGet("{idChiNhanh}")]
    public async Task<IActionResult> GetTenChiNhanhById(int idChiNhanh)
    {
        var tenChiNhanh = await _service.GetTenChiNhanhByIdAsync(idChiNhanh);
        if (tenChiNhanh == null)
        {
            return NotFound();
        }
        return Ok(tenChiNhanh);
    }


    [HttpGet]
    public async Task<IActionResult> GetAllChiNhanh()
    {
        var chiNhanhs = await _service.GetAllChiNhanhAsync();
        return Ok(chiNhanhs);
    }

    [HttpGet]
    [Route("user/{username}")]
    public async Task<IActionResult> GetChiNhanhIdByTaiKhoan(string username)
    {
        var chiNhanhId = await _nguoiDungService.GetChiNhanhIdByTaiKhoan(username);

        if (chiNhanhId == null)
        {
            return NotFound(new { message = "User not found" });
        }

        return Ok(new { IdChiNhanh = chiNhanhId, TaiKhoan = username });
    }
}



