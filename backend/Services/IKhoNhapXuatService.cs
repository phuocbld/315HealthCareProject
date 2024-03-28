using _315HealthCareProject.DTO;
using _315HealthCareProject.Models;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services
{
    public interface IKhoNhapXuatService
    {
        KhoNhapXuat CreateKhoNhap(string tenPhieu, string noiDung, int trangThai , int idKhoNhap , int nhanVienNhan , DateTime ngayNhan );

        KhoNhapXuat CreateKhoXuat(string tenPhieu, string noiDung, int trangThai);
    }
}
