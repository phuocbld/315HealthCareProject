namespace _315HealthCareProject.Services.Interface
{
    public interface ISmsService
    {
        Task<bool> SendSmsAsync(string recipientNumber, string messageContent);
        Task<bool> LoginAsync(string bindMode = "T");
        bool IsLoggedIn();
    }
}
