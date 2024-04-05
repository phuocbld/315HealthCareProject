using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface ICongTyBenhNhanRepository
    {
        Task<IEnumerable<CongTyBenhNhan>> GetAllAsync();
        Task AddBenhNhanCongTyAsync(CongTyBenhNhan congTyBenhNhan);
        Task<string> GenerateMaBNAsync(int idCT);
        Task UpdateBenhNhanAsync(CongTyBenhNhan benhNhan);
    }


}
