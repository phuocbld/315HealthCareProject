////using _315HealthCareProject.Models;
////using _315HealthCareProject.Repositories;
////using System.Threading.Tasks;

////namespace _315HealthCareProject.Services
////{
////    public class AuthService : IAuthService
////    {
////        private readonly INguoiDungRepository _nguoiDungRepository;

////        public AuthService(INguoiDungRepository nguoiDungRepository)
////        {
////            _nguoiDungRepository = nguoiDungRepository;
////        }

////        public async Task<NguoiDung> LoginAsync(string taiKhoan, string matKhau, int idChiNhanh)
////        {
////            var nguoiDung = await _nguoiDungRepository.GetNguoiDungByTaiKhoanMatKhauAsync(taiKhoan, matKhau);

////            if (nguoiDung != null)
////            {
////                // Cập nhật idChiNhanh cho người dùng
////                nguoiDung.IdChiNhanh = idChiNhanh;
////                await _nguoiDungRepository.UpdateNguoiDungAsync(nguoiDung);
////            }

////            return nguoiDung;
////        }
////    }
////}
//namespace _315HealthCareProject.Services;
//using _315HealthCareProject.Data;
//using _315HealthCareProject.Models;
//using _315HealthCareProject.Services;
//using Microsoft.EntityFrameworkCore;

//public class AuthService : IAuthService
//{
//    private readonly ApplicationDbContext _context;

//    public AuthService(ApplicationDbContext context)
//    {
//        _context = context;
//    }

//    public async Task<NguoiDung> AuthenticateAsync(string taiKhoan, string matKhau)
//    {
//        // Thực hiện xác thực thông tin đăng nhập
//        var nguoiDung = await _context.NguoiDungs
//            .FirstOrDefaultAsync(u => u.TaiKhoan == taiKhoan && u.MatKhau == matKhau);

//        return nguoiDung;
//    }
//}
