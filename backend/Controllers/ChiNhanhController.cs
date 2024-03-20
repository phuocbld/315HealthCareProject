namespace _315HealthCareProject.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using _315HealthCareProject.Services;

[ApiController]
[Route("api/[controller]")]
public class ChiNhanhController : ControllerBase
{
    private readonly IChiNhanhService _service;

    public ChiNhanhController(IChiNhanhService service)
    {
        _service = service;
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

}

