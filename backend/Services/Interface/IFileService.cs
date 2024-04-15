using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace _315HealthCareProject.Services.Interface
{
    public interface IFileService
    {
        Task<string> UploadFileAsync(IFormFile file, string folder);
    }
}
