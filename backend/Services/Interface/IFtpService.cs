namespace _315HealthCareProject.Services.Interface
{
    public interface IFtpService
    {
        Task<byte[]> DownloadFileAsync(string remotePath);
        Task<string> UploadFileAsnyc(IFormFile? file, string directory, string fileName);
        Task ListFilesOnFtpServer(string directory);
    }
}
