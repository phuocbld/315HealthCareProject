using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface ICongTyBenhNhanRepository
    {
        Task<IEnumerable<CongTyBenhNhan>> GetAllAsync();
        Task AddBenhNhanCongTyAsync(CongTyBenhNhan congTyBenhNhan);
        Task<string> GenerateMaBNAsync(int idCT);
        Task UpdateBenhNhanAsync(CongTyBenhNhan benhNhan);
        Task<CongTyBenhNhan> GetBenhNhanByIdAsync(int id);
        Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanByTenAsync(string ten);
        Task DeleteBenhNhanAsync(int id);
        Task<string> GetSoDienThoaiByIdAsync(int id);
        Task UpdatePatientAsync(CongTyBenhNhan patient);
        Task<IEnumerable<CongTyBenhNhan>> GetPatientsToSendSmsAsync(int idCT);
    }


}
