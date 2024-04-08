
//using _315HealthCareProject.Repositories.Interface;
//using _315HealthCareProject.Services.Interface;
//using Microsoft.AspNetCore.Mvc;
//using System.Threading.Tasks;

//namespace _315HealthCareProject.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class SmsController : ControllerBase
//    {
//        private readonly ISmsService _smsService;
//        private readonly ICongTyBenhNhanRepository _congTyBenhNhanRepository;

//        public SmsController(ISmsService smsService , ICongTyBenhNhanRepository congTyBenhNhanRepository)
//        {
//            _smsService = smsService;
//            _congTyBenhNhanRepository = congTyBenhNhanRepository;
//        }

//        [HttpPost("CheckLogin")]
//        public async Task<IActionResult> LoginAsync()
//        {
//            var isLoggedIn = await _smsService.LoginAsync();
//            if (isLoggedIn)
//            {
//                return Ok("Đăng nhập vào hệ thống SMS Brandname thành công.");
//            }
//            else
//            {
//                return StatusCode(500, "Đăng nhập vào hệ thống SMS Brandname không thành công.");
//            }
//        }

//        [HttpPost("Send")]
//        public async Task<IActionResult> SendSmsAsync([FromQuery] string phoneNumber, [FromQuery] string message)
//        {
//            // Kiểm tra xem đã đăng nhập vào hệ thống SMS Brandname chưa
//            if (!_smsService.IsLoggedIn())
//            {
//                // Nếu chưa đăng nhập, thực hiện đăng nhập
//                var loginResult = await _smsService.LoginAsync();
//                if (!loginResult)
//                {
//                    return StatusCode(500, "Đăng nhập vào hệ thống SMS Brandname không thành công.");
//                }
//            }

//            // Kiểm tra xem số điện thoại và nội dung tin nhắn có hợp lệ không
//            if (string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(message))
//            {
//                return BadRequest("Số điện thoại hoặc nội dung tin nhắn không được để trống.");
//            }

//            // Gửi tin nhắn
//            var sendResult = await _smsService.SendSmsAsync(phoneNumber, message);

//            if (sendResult)
//            {
//                return Ok("Tin nhắn đã được gửi thành công.");
//            }
//            else
//            {
//                return StatusCode(500, "Đã xảy ra lỗi khi gửi tin nhắn.");
//            }
//        }



//    }
//}


using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmsController : ControllerBase
    {
        private readonly ISmsService _smsService;
        private readonly ICongTyBenhNhanRepository _congTyBenhNhanRepository;

        public SmsController(ISmsService smsService, ICongTyBenhNhanRepository congTyBenhNhanRepository)
        {
            _smsService = smsService;
            _congTyBenhNhanRepository = congTyBenhNhanRepository;
        }

        [HttpPost("CheckLogin")]
        public async Task<IActionResult> LoginAsync()
        {
            var isLoggedIn = await _smsService.LoginAsync();
            if (isLoggedIn)
            {
                return Ok("Đăng nhập vào hệ thống SMS Brandname thành công.");
            }
            else
            {
                return StatusCode(500, "Đăng nhập vào hệ thống SMS Brandname không thành công.");
            }
        }

        [HttpPost("Send")]
        public async Task<IActionResult> SendSmsAsync([FromQuery] string phoneNumber, [FromQuery] string message)
        {
            // Kiểm tra xem đã đăng nhập vào hệ thống SMS Brandname chưa
            if (!_smsService.IsLoggedIn())
            {
                // Nếu chưa đăng nhập, thực hiện đăng nhập
                var loginResult = await _smsService.LoginAsync();
                if (!loginResult)
                {
                    return StatusCode(500, "Đăng nhập vào hệ thống SMS Brandname không thành công.");
                }
            }

            // Kiểm tra xem số điện thoại và nội dung tin nhắn có hợp lệ không
            if (string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(message))
            {
                return BadRequest("Số điện thoại hoặc nội dung tin nhắn không được để trống.");
            }

            // Gửi tin nhắn
            var sendResult = await _smsService.SendSmsAsync(phoneNumber, message);

            if (sendResult)
            {
                // Tìm tất cả bệnh nhân có cùng số điện thoại và cập nhật trạng thái SMS
                var patients = await _congTyBenhNhanRepository.GetBenhNhanBySoDienThoaiAsync(phoneNumber);
                foreach (var patient in patients)
                {
                    // Nếu tìm thấy bệnh nhân, cập nhật trạng thái SMS là 2
                    patient.TRANGTHAISMS = 2;
                    await _congTyBenhNhanRepository.UpdatePatientAsync(patient);
                }

                return Ok("Tin nhắn đã được gửi thành công và cập nhật trạng thái SMS của bệnh nhân.");
            }
            else
            {
                return StatusCode(500, "Đã xảy ra lỗi khi gửi tin nhắn.");
            }
        }


        //[HttpPost("SendToMultiple/{idCT}")]
        //public async Task<IActionResult> SendSmsToMultipleAsync(int idCT)
        //{
        //    try
        //    {
        //        // Lấy danh sách bệnh nhân cần gửi tin nhắn dựa trên IDCT
        //        var patients = await _congTyBenhNhanRepository.GetBenhNhanByIdCTAsync(idCT);

        //        // Kiểm tra nếu không có bệnh nhân nào thỏa mãn điều kiện
        //        if (!patients.Any())
        //        {
        //            return NotFound("Không có bệnh nhân nào thỏa mãn điều kiện.");
        //        }

        //        // Gửi tin nhắn cho từng bệnh nhân
        //        foreach (var patient in patients)
        //        {
        //            // Kiểm tra điều kiện TrangThaiKham của bệnh nhân
        //            if (patient.TRANGTHAIKHAM == 2 || patient.TRANGTHAIKHAM == 3)
        //            {
        //                var phoneNumber = patient.SODIENTHOAI;
        //                var message = $"Tất cả các xét nghiệm của mã hồ sơ {patient.MABN} đã hoàn thành. Xem chi tiết tại: benhandientu.ivyhealth.com";

        //                // Gửi tin nhắn
        //                var sendResult = await _smsService.SendSmsAsync(phoneNumber, message);

        //                if (sendResult)
        //                {
        //                    // Nếu gửi thành công, cập nhật TrangThaiSMS là 2
        //                    patient.TRANGTHAISMS = 2;
        //                }
        //                else
        //                {
        //                    // Nếu gửi không thành công, cập nhật TrangThaiSMS là 3
        //                    patient.TRANGTHAISMS = 3;
        //                }

        //                // Lưu cập nhật vào cơ sở dữ liệu
        //                await _congTyBenhNhanRepository.UpdatePatientAsync(patient);
        //            }
        //        }

        //        return Ok("Đã gửi tin nhắn cho các bệnh nhân thành công.");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
        //    }
        //}

    }
}
