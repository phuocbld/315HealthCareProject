namespace _315HealthCareProject.Services.Interface
{
    public interface INguoiDungService
    {
        Task<int?> GetChiNhanhIdByTaiKhoan(string username);
        Task<int?> GetIdNguoiDungByTaiKhoan(string username);
    }
}
