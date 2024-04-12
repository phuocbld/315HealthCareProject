using System;
using System.Net;

namespace _315HealthCareProject.Helper
{


    public class FtpHelper
    {
        public static bool TestFtpConnection(string serverUri, string username, string password)
        {
            try
            {
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(serverUri);
                request.Credentials = new NetworkCredential(username, password);
                request.Method = WebRequestMethods.Ftp.ListDirectory;
                using (FtpWebResponse response = (FtpWebResponse)request.GetResponse())
                {
                    return true;
                }
            }
            catch (WebException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }

}
