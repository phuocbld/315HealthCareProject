namespace _315HealthCareProject.Services.Interface
{
    public interface IFtpService
    {
        Task DownloadFileAsync(string localPath, string remotePath);
        //Task UploadFileAsync(string localPath, string remotePath);
        Task UploadFileAsync(byte[] fileBytes, string remoteFileName, string remoteDirectory);
        Task<bool> IsLoginValidAsync();
    }
}
