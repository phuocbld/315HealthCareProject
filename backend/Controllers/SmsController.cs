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

//        public SmsController(ISmsService smsService)
//        {
//            _smsService = smsService;
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

//        [HttpPost("send")]
//        public async Task<IActionResult> SendSmsAsync([FromQuery] string phoneNumber, [FromQuery] string message)
//        {
//            if (string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(message))
//            {
//                return BadRequest("Số điện thoại hoặc nội dung tin nhắn không được để trống.");
//            }

//            // Kiểm tra xem đã đăng nhập vào hệ thống SMS Brandname chưa
//            if (!_smsService.IsLoggedIn())
//            {
//                // Nếu chưa đăng nhập, trả về lỗi
//                return StatusCode(403, "Vui lòng đăng nhập vào hệ thống SMS Brandname trước khi gửi tin nhắn.");
//            }

//            // Gửi tin nhắn
//            var result = await _smsService.SendSmsAsync(phoneNumber, message);

//            if (result)
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

using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace _315HealthCareProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmsController : ControllerBase
    {
        private readonly ISmsService _smsService;

        public SmsController(ISmsService smsService)
        {
            _smsService = smsService;
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
                return Ok("Tin nhắn đã được gửi thành công.");
            }
            else
            {
                return StatusCode(500, "Đã xảy ra lỗi khi gửi tin nhắn.");
            }
        }
    }
}


