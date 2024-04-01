//using Microsoft.AspNetCore.Mvc;
//using System;

//namespace _315HealthCareProject.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CompareTimeController : ControllerBase
//    {
//        [HttpPost]
//        public IActionResult CompareTime(DateTimeOffset thoiGianDangNhap)
//        {
//            // Chuyển đổi thời gian từ DateTimeOffset sang DateTime
//            DateTime thoiGianDangNhapDateTime = thoiGianDangNhap.UtcDateTime;


//            // Tính toán IDCaLamViec dựa trên thời gian DangNhap
//            int idCaLamViec = TinhToanIDCaLamViec(thoiGianDangNhapDateTime);

//            if (idCaLamViec == 0)
//            {
//                // Nếu không tìm thấy ca làm việc phù hợp
//                return NotFound("Không tìm thấy ca làm việc phù hợp.");
//            }

//            return Ok($"IDCaLamViec tương ứng: {idCaLamViec}");
//        }

//        private int TinhToanIDCaLamViec(DateTime thoiGianDangNhap)
//        {
//            // Tính toán IDCaLamViec dựa trên thời gian DangNhap
//            TimeSpan gioDangNhap = thoiGianDangNhap.TimeOfDay;
//            int idCaLamViec = 0;

//            if (gioDangNhap >= new TimeSpan(7, 30, 0) && gioDangNhap < new TimeSpan(8, 30, 0))

//            {
//                idCaLamViec = 1;
//            }
//            if (gioDangNhap >= new TimeSpan(11, 30, 0) && gioDangNhap < new TimeSpan(12, 30, 0))
//            {
//                idCaLamViec = 2;
//            }

//            if (gioDangNhap >= new TimeSpan(16, 30, 0) && gioDangNhap < new TimeSpan(17, 30, 0))
//            {
//                idCaLamViec |= 3;
//            }

//                return idCaLamViec;
//        }
//    }
//}

using Microsoft.AspNetCore.Mvc;
using System;
using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompareTimeController : ControllerBase
    {
        private readonly ITimeComparisonService _timeComparisonService;

        public CompareTimeController(ITimeComparisonService timeComparisonService)
        {
            _timeComparisonService = timeComparisonService;
        }

        [HttpPost]
        public IActionResult CompareTime(DateTimeOffset thoiGianDangNhap)
        {
            // Gọi phương thức từ Service để tính toán IDCaLamViec và định dạng thời gian
            int idCaLamViec = _timeComparisonService.CompareTimeAndCalculateIDCaLamViec(thoiGianDangNhap);

            if (idCaLamViec == 0)
            {
                // Nếu không tìm thấy ca làm việc phù hợp
                return NotFound("Không tìm thấy ca làm việc phù hợp.");
            }

            return Ok($"IDCaLamViec tương ứng: {idCaLamViec}");
        }
    }
}
