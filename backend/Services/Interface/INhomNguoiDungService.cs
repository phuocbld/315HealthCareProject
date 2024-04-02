namespace _315HealthCareProject.Services.Interface
{
    public interface INhomNguoiDungService
    {
        Task<string> GetTenNhomByIdAsync(int idNhom);
    }
}
