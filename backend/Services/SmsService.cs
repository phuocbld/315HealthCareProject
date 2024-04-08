

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using _315HealthCareProject.Services.Interface;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace _315HealthCareProject.Services
{
    public class SmsService : ISmsService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private bool _isLoggedIn;

        public SmsService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _isLoggedIn = false;
        }

        public async Task<bool> LoginAsync(string bindMode = "T")
        {
            try
            {
                var username = _configuration["SmsService:Username"];
                var password = _configuration["SmsService:Password"];

                var usernameEncoded = Uri.EscapeDataString(username);
                var passwordEncoded = Uri.EscapeDataString(password);

                var request = new HttpRequestMessage(HttpMethod.Post, "http://smsbrandname.mobifone.vn/smsg/login.jsp");
                var content = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    { "userName",  usernameEncoded},
                    { "password", passwordEncoded },
                    { "bindMode", bindMode }
                });
                request.Content = content;

                var response = await _httpClient.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    // Lấy sessionId từ phản hồi JSON
                    var sessionIdResponse = await response.Content.ReadAsStringAsync();
                    var sessionIdJson = JObject.Parse(sessionIdResponse);
                    var sessionId = sessionIdJson["sid"].ToString();

                    // Loại bỏ ký tự xuống dòng và dấu cách nếu có
                    sessionId = sessionId.Replace("\r", "").Replace("\n", "");

                    // Thêm sessionId vào tiêu đề của yêu cầu
                    _httpClient.DefaultRequestHeaders.Add("sessionId", sessionId);

                    _isLoggedIn = true;
                    return true;
                }
                else
                {
                    // Xử lý trường hợp đăng nhập không thành công
                    Console.WriteLine($"Đăng nhập vào hệ thống SMS Brandname không thành công. Mã trạng thái: {response.StatusCode}");
                    _isLoggedIn = false;
                    return false;
                }
            }
            catch (Exception ex)
            {
                // Xử lý lỗi khi gọi API đăng nhập
                Console.WriteLine($"Lỗi khi đăng nhập: {ex.Message}");
                _isLoggedIn = false;
                return false;
            }
        }

        public bool IsLoggedIn()
        {
            // Kiểm tra xem đã đăng nhập vào hệ thống SMS Brandname chưa
            return _httpClient.DefaultRequestHeaders.Contains("sessionId");
        }

        public async Task<bool> SendSmsAsync(string phoneNumber, string message)
        {
            // Kiểm tra xem đã đăng nhập vào hệ thống SMS Brandname chưa
            // Nếu chưa thì thực hiện đăng nhập trước
            if (!_isLoggedIn)
            {
                // Thực hiện đăng nhập
                var isLoggedIn = await LoginAsync("T");
                if (!isLoggedIn)
                {
                    // Xử lý trường hợp đăng nhập không thành công
                    Console.WriteLine("Đăng nhập vào hệ thống SMS Brandname không thành công.");
                    return false;
                }
            }

            try
            {
                var request = new HttpRequestMessage(HttpMethod.Post, "http://smsbrandname.mobifone.vn/smsg/send.jsp");
                var sessionId = _httpClient.DefaultRequestHeaders.GetValues("sessionId");
                var sessionIdString = string.Join("", sessionId);
                var queryString = new Dictionary<string, string>
                {
                    { "sid", sessionIdString },
                    { "sender", "315MEDICAL" },
                    { "recipient", phoneNumber },
                    { "content", message }
                };
                request.Content = new FormUrlEncodedContent(queryString);

                var response = await _httpClient.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    // Xử lý khi gửi tin nhắn thành công
                    Console.WriteLine("Gửi tin nhắn thành công.");
                    return true;
                }
                else
                {
                    // Xử lý trường hợp gửi tin nhắn không thành công
                    Console.WriteLine("Gửi tin nhắn không thành công.");
                    return false;
                }
            }
            catch (Exception ex)
            {
                // Xử lý lỗi khi gọi API gửi tin nhắn
                Console.WriteLine($"Lỗi khi gửi tin nhắn: {ex.Message}");
                return false;
            }
        }
    }
}
