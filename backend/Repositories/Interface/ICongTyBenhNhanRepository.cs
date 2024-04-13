using _315HealthCareProject.Models;

namespace _315HealthCareProject.Repositories.Interface
{
    public interface ICongTyBenhNhanRepository
    {
        Task<IEnumerable<CongTyBenhNhan>> GetAllAsync();
        Task AddBenhNhanCongTyAsync(CongTyBenhNhan congTyBenhNhan);
        Task<string> GenerateMaBNAsync(string maCT);
        Task UpdateBenhNhanAsync(CongTyBenhNhan benhNhan);
        Task<CongTyBenhNhan> GetBenhNhanByIdAsync(int id);
        Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanByTenAsync(string ten);
        Task DeleteBenhNhanAsync(int id);
        Task<string> GetSoDienThoaiByIdAsync(int id);
        Task UpdatePatientAsync(CongTyBenhNhan patient);
        Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanByIdCTAsync(int idCT);
        Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanByMaBNAsync(string maBN);
        Task<IEnumerable<CongTyBenhNhan>> SearchBenhNhanAsync(string keyword);
        Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanBySoDienThoaiAsync(string soDienThoai);
    }


}
