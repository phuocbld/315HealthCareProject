namespace _315HealthCareProject.Services
{
    public interface INguoiDungService
    {
        Task<int?> GetChiNhanhIdByTaiKhoan(string username);
    }
}
