namespace _315HealthCareProject.Services
{
    public interface INhomNguoiDungService
    {
        Task<string> GetTenNhomByIdAsync(int idNhom);
    }
}
