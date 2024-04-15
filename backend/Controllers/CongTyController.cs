using _315HealthCareProject.Models;
using _315HealthCareProject.Services;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CongTyController : ControllerBase
    {
        private readonly ICongTyService _congTyService;

        public CongTyController(ICongTyService congTyService)
        {
            _congTyService = congTyService;
        }


        [HttpGet]
        public ActionResult<IEnumerable<CongTy>> Get()
        {
            var companies = _congTyService.GetAllCongTy();
            return Ok(companies);
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            var companyName = _congTyService.GetTenCTById(id);
            if (companyName == null)
            {
                return NotFound();
            }
            return Ok(companyName);
        }
    }
}
