using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using _315HealthCareProject.Services.Interface;
using Microsoft.Extensions.Configuration;
using FluentFTP;

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
            using (var ftpClient = new FtpClient())
            {
                try
                {
                    ftpClient.Host = _host;
                    ftpClient.Port = _port;
                    ftpClient.Credentials = new NetworkCredential(_username, _password);

                    await ftpClient.ConnectAsync();

                    if (!ftpClient.IsConnected)
                    {
                        Console.WriteLine("FTP client is not connected.");
                        return;
                    }

                    using (var outputStream = File.OpenWrite(localPath))
                    {
                        await ftpClient.DownloadAsync(outputStream, Path.Combine(_remoteDirectory, remotePath));
                    }
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

        public async Task UploadFileAsync(byte[] fileBytes, string remoteFileName, string remoteDirectory)
        {
            using (var ftpClient = new FtpClient())
            {
                try
                {
                    ftpClient.Host = _host;
                    ftpClient.Port = _port;
                    ftpClient.Credentials = new NetworkCredential(_username, _password);

                    await ftpClient.ConnectAsync();

                    if (!ftpClient.IsConnected)
                    {
                        Console.WriteLine("FTP client is not connected.");
                        return;
                    }

                    using (var inputStream = new MemoryStream(fileBytes))
                    {
                        await ftpClient.UploadAsync(inputStream, Path.Combine(_remoteDirectory, remoteDirectory, remoteFileName));
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred while uploading the file: {ex.Message}");
                    if (ex.InnerException != null)
                    {
                        Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                    }
                }
                finally
                {
                    ftpClient.Disconnect();
                }
            }
        }

        public async Task<bool> IsLoginValidAsync()
        {
            using (var ftpClient = new FtpClient())
            {
                try
                {
                    ftpClient.Host = _host;
                    ftpClient.Port = _port;
                    ftpClient.Credentials = new NetworkCredential(_username, _password);

                    await ftpClient.ConnectAsync();

                    // Kiểm tra trạng thái của kết nối để xác định tính hợp lệ của thông tin đăng nhập
                    return ftpClient.IsConnected;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred while connecting to FTP server: {ex.Message}");
                    return false;
                }
                finally
                {

                }
            }
        }
    }
}
