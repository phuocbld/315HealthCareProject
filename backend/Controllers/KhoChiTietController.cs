//using _315HealthCareProject.Models;
//using _315HealthCareProject.Repositories;
//using _315HealthCareProject.Repositories.Interface;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace _315HealthCareProject.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class KhoChiTietController : ControllerBase
//    {
//        private readonly IKhoChiTietRepository _khoChiTietRepository;

//        public KhoChiTietController(IKhoChiTietRepository khoChiTietRepository)
//        {
//            _khoChiTietRepository = khoChiTietRepository;
//        }

//        [HttpPost]
//        public async Task<IActionResult> AddKhoChiTietList(List<KhoChiTiet> khoChiTietList)
//        {
//            try
//            {
//                List<KhoChiTiet> addedKhoChiTietList = new List<KhoChiTiet>();


//                // Duyệt qua từng phần tử trong danh sách và thêm vào cơ sở dữ liệu
//                foreach (var khoChiTiet in khoChiTietList)
//                {
//                    if (khoChiTiet.Vat5 == null && khoChiTiet.Vat8 == null && khoChiTiet.Vat10 == null)
//                    {
//                        khoChiTiet.Vat5 = 1;
//                    }

//                    await _khoChiTietRepository.AddKhoChiTietAsync(khoChiTiet);
//                }

//                return Ok(addedKhoChiTietList);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, "An error occurred while adding kho chi tiet: " + ex.Message);
//            }
//        }
//    }
//}

using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KhoChiTietController : ControllerBase
    {
        private readonly IKhoChiTietService _khoChiTietService;

        public KhoChiTietController(IKhoChiTietService khoChiTietService)
        {
            _khoChiTietService = khoChiTietService;
        }

        [HttpPost]
        public async Task<IActionResult> AddKhoChiTietList(List<KhoChiTiet> khoChiTietList)
        {
            try
            {
                await _khoChiTietService.AddKhoChiTietListAsync(khoChiTietList);
                return Ok(khoChiTietList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while adding kho chi tiet: " + ex.Message);
            }
        }
    }
}
