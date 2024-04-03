using _315HealthCareProject.DTO;
using _315HealthCareProject.Models;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services.Interface
{
    public interface IKhoNhapXuatService
    {

        Task<KhoNhapXuat> CreateKhoNhap(string tenPhieu, string noiDung, int trangThai);
        Task<KhoNhapXuat> CreateKhoXuat(string tenPhieu, string noiDung, int trangThai);



        Task<IEnumerable<KhoNhapXuat>> GetAllPhieuNhapAsync();
        Task<IEnumerable<KhoNhapXuat>> GetAllPhieuXuatAsync();
        Task<IEnumerable<KhoNhapXuat>> GetAllPhieuNhapXuatAsync();
    }
}
