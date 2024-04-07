
using _315HealthCareProject.Repositories.Interface;
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
        private readonly ICongTyBenhNhanRepository _congTyBenhNhanRepository;

        public SmsController(ISmsService smsService , ICongTyBenhNhanRepository congTyBenhNhanRepository)
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
                return Ok("Tin nhắn đã được gửi thành công.");
            }
            else
            {
                return StatusCode(500, "Đã xảy ra lỗi khi gửi tin nhắn.");
            }
        }

        //[HttpPost("SendToMultiple")]
        //public async Task<IActionResult> SendSmsToMultipleAsync()
        //{
        //    try
        //    {
        //        // Lấy danh sách bệnh nhân cần gửi tin nhắn
        //        var patients = await _yourPatientRepository.GetPatientsToSendSmsAsync();

        //        // Filter bệnh nhân theo điều kiện TrangThaiKham là 2 hoặc 3
        //        var patientsToSend = patients.Where(p => p.TrangThaiKham == 2 || p.TrangThaiKham == 3).ToList();

        //        // Kiểm tra nếu không có bệnh nhân nào thỏa mãn điều kiện
        //        if (!patientsToSend.Any())
        //        {
        //            return NotFound("Không có bệnh nhân nào thỏa mãn điều kiện.");
        //        }

        //        // Gửi tin nhắn cho từng bệnh nhân
        //        foreach (var patient in patientsToSend)
        //        {
        //            var phoneNumber = patient.SoDienThoai;
        //            var message = $"Tat ca cac xet nghiem cua ma ho so {patient.MaBN} da hoan thanh. Xem chi tiet: benhandientu.ivyhealth.com";

        //            // Gửi tin nhắn
        //            var sendResult = await _smsService.SendSmsAsync(phoneNumber, message);

        //            if (sendResult)
        //            {
        //                // Nếu gửi thành công, cập nhật TrangThaiSMS là 2
        //                patient.TrangThaiSMS = 2;
        //            }
        //            else
        //            {
        //                // Nếu gửi không thành công, cập nhật TrangThaiSMS là 3
        //                patient.TrangThaiSMS = 3;
        //            }

        //            // Lưu cập nhật vào cơ sở dữ liệu
        //            await _yourPatientRepository.UpdatePatientAsync(patient);
        //        }

        //        return Ok("Đã gửi tin nhắn cho các bệnh nhân thành công.");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
        //    }
        //}
        [HttpPost("SendToMultiple/{idCT}")]
        public async Task<IActionResult> SendSmsToMultipleAsync(int idCT)
        {
            try
            {
                // Lấy danh sách bệnh nhân cần gửi tin nhắn dựa trên IDCT
                var patients = await _congTyBenhNhanRepository.GetPatientsToSendSmsAsync(idCT);

                // Filter bệnh nhân theo điều kiện TrangThaiKham là 2 hoặc 3
                var patientsToSend = patients.Where(p => p.TRANGTHAIKHAM == 2 || p.TRANGTHAIKHAM == 3).ToList();

                // Kiểm tra nếu không có bệnh nhân nào thỏa mãn điều kiện
                if (!patientsToSend.Any())
                {
                    return NotFound("Không có bệnh nhân nào thỏa mãn điều kiện.");
                }

                // Gửi tin nhắn cho từng bệnh nhân
                foreach (var patient in patientsToSend)
                {
                    var phoneNumber = patient.SODIENTHOAI;
                    var message = $"Tat ca cac xet nghiem cua ma ho so {patient.MABN} da hoan thanh. Xem chi tiet: benhandientu.ivyhealth.com";

                    // Gửi tin nhắn
                    var sendResult = await _smsService.SendSmsAsync(phoneNumber, message);

                    if (sendResult)
                    {
                        // Nếu gửi thành công, cập nhật TrangThaiSMS là 2
                        patient.TRANGTHAISMS = 2;
                    }
                    else
                    {
                        // Nếu gửi không thành công, cập nhật TrangThaiSMS là 3
                        patient.TRANGTHAISMS = 3;
                    }

                    // Lưu cập nhật vào cơ sở dữ liệu
                    await _congTyBenhNhanRepository.UpdatePatientAsync(patient);
                }

                return Ok("Đã gửi tin nhắn cho các bệnh nhân thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
            }
        }
    }
}


