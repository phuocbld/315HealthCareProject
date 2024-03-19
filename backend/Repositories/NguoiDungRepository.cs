//using _315HealthCareProject.Data;
//using _315HealthCareProject.Models;
//using Microsoft.EntityFrameworkCore;
//using System.Threading.Tasks;

//namespace _315HealthCareProject.Repositories
//{
//    public class NguoiDungRepository : INguoiDungRepository
//    {
//        private readonly ApplicationDbContext _context;

//        public NguoiDungRepository(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        //public async Task<NguoiDung> GetNguoiDungByTaiKhoanMatKhauAsync(string taiKhoan, string matKhau)
//        //{
//        //    var nguoiDung = await _context.NguoiDungs.FirstOrDefaultAsync(nd => nd.TaiKhoan == taiKhoan && nd.MatKhau == matKhau);

//        //    // Kiểm tra giá trị NULL trước khi sử dụng
//        //    if (nguoiDung != null)
//        //    {
//        //        // Thực hiện các thao tác với nguoiDung
//        //    }
//        //    else
//        //    {
//        //        // Xử lý trường hợp nguoiDung là NULL
//        //        // Ví dụ: Ghi log hoặc thông báo lỗi
//        //        Console.WriteLine("Không tìm thấy người dùng với tài khoản và mật khẩu đã cung cấp.");
//        //    }

//        //    return nguoiDung;
//        //}
//        public async Task<NguoiDung> GetNguoiDungByTaiKhoanMatKhauAsync(string taiKhoan, string matKhau)
//        {
//            return await _context.NguoiDungs.FirstOrDefaultAsync(nd => nd.TaiKhoan == taiKhoan && nd.MatKhau == matKhau);
//        }


//        public async Task UpdateNguoiDungAsync(NguoiDung nguoiDung)
//        {
//            if (nguoiDung != null)
//            {
//                _context.Entry(nguoiDung).State = EntityState.Modified;
//                await _context.SaveChangesAsync();
//            }
//        }
//    }
//}
