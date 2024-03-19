using _315HealthCareProject.Services;
using Microsoft.AspNetCore.Http.HttpResults;

namespace _315HealthCareProject.Controllers;

using Microsoft.AspNetCore.Mvc;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/calamviec")]
public class CaLamViecController : ControllerBase
{
    private readonly ICaLamViecService _service;

    public CaLamViecController(ICaLamViecService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _service.GetAllAsync();
        return Ok(items);
    }
}