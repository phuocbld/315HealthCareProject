using _315HealthCareProject.Services.Interface;
using FluentFTP;
using Microsoft.Extensions.Configuration;
namespace _315HealthCareProject.Services
{
    public class FtpService : IFtpService
    {
        private readonly string _host;
        private readonly int _port;
        private readonly string _username;
        private readonly string _password;
        private readonly string _remoteDirectory;

        public FtpService(IConfiguration configuration)
        {
            _host = configuration["FTPSettings:Server"];
            _port = int.Parse(configuration["FTPSettings:Port"]);
            _username = configuration["FTPSettings:Username"];
            _password = configuration["FTPSettings:Password"];
            _remoteDirectory = configuration["FTPSettings:RemoteDirectory"];
        }

        public async Task DownloadFileAsync(string localPath, string remotePath)
        {
            using (var ftpClient = new FtpClient(_host, _username, _password))
            {
                try
                {
                    await ftpClient.ConnectAsync();
                    await ftpClient.DownloadFileAsync(localPath, Path.Combine(_remoteDirectory, remotePath));
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred while downloading the file: {ex.Message}");
                }
                finally
                {
                    ftpClient.Disconnect();
                }
            }
        }

        public async Task UploadFileAsync(string localPath, string remotePath)
        {
            using (var ftpClient = new FtpClient(_host, _username, _password))
            {
                try
                {
                    await ftpClient.ConnectAsync();
                    await ftpClient.UploadFileAsync(localPath, Path.Combine(_remoteDirectory, remotePath));
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred while uploading the file: {ex.Message}");
                }
                finally
                {
                    ftpClient.Disconnect();
                }
            }
        }
    }
}