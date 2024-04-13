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

        public async Task<byte[]> DownloadFileAsync(string remotePath)
        {
            using (var ftpClient = new WebClient())
            {
                ftpClient.Credentials = new NetworkCredential(_username, _password);
                var tempFilePath = Path.GetTempFileName();
                await ftpClient.DownloadFileTaskAsync(new Uri($"ftp://{_host}:{_port}/{remotePath}"), tempFilePath);
                return await File.ReadAllBytesAsync(tempFilePath);
            }
        }


        public async Task<string> UploadFileAsnyc(IFormFile? file, string directory, string fileName)
        {
            string ftpUrl = $"ftp://{_host}:{_port}/";
            string fullFtpPath = $"{ftpUrl}{directory}/{fileName}";

            try
            {
                using (var client = new WebClient())
                {
                    client.Credentials = new NetworkCredential(_username, _password);
                    string localFilePath = Path.GetTempFileName();
                    using (var stream = new FileStream(localFilePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    await client.UploadFileTaskAsync(new Uri(fullFtpPath), WebRequestMethods.Ftp.UploadFile, localFilePath);

                    File.Delete(localFilePath);
                    return fullFtpPath;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error uploading file to FTP: {ex.Message}");
                throw;
            }
        }


        public async Task ListFilesOnFtpServer(string directory)
        {
            try
            {
                using (var ftpClient = new FtpClient(_host, _username, _password))
                {
                    await ftpClient.ConnectAsync();

                    if (!ftpClient.IsConnected)
                    {
                        Console.WriteLine("FTP client is not connected.");
                        return;
                    }

                    var listing = await ftpClient.GetListingAsync(directory);

                    Console.WriteLine($"Files in directory '{directory}':");
                    foreach (var item in listing)
                    {
                        Console.WriteLine(item.FullName);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while listing files on the FTP server: {ex.Message}");
            }
        }

    }
}

