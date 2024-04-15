using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services
{
    public class FileService : IFileService
    {
        private readonly string _baseURL;

        public FileService(IConfiguration configuration)
        {
            _baseURL = configuration["FileStorageSettings:BaseURL"];
        }

        public async Task<string> UploadFileAsync(IFormFile file, string folder)
        {
            string fileName = $"{Guid.NewGuid().ToString()}_{file.FileName}";
            string url = $"{_baseURL}/{folder}/{fileName}";

            using (var client = new HttpClient())
            {
                using (var content = new MultipartFormDataContent())
                {
                    content.Add(new StreamContent(file.OpenReadStream())
                    {
                        Headers =
                        {
                            ContentLength = file.Length,
                            ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(file.ContentType)
                        }
                    }, "file", fileName);

                    using (var response = await client.PostAsync(url, content))
                    {
                        if (!response.IsSuccessStatusCode)
                        {
                            throw new Exception($"Failed to upload file to {url}. Status code: {response.StatusCode}");
                        }
                    }
                }
            }

            return url;
        }
    }
}
