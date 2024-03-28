//using System;
//using Microsoft.EntityFrameworkCore;
//using _315HealthCareProject.Data;
//using _315HealthCareProject.Models;

//namespace _315HealthCareProject.Services
//{
//    public class KhoNhapXuatService : IKhoNhapXuatService
//    {
//        private readonly ApplicationDbContext _context;

//        public KhoNhapXuatService(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        public KhoNhapXuat CreateKhoNhap(string tenPhieu, int idKhoNhap, string noiDung,
//                                             int nhanVienNhan, DateTime ngayNhan, string ghiChu,
//                                             int trangThai, int idDoiTac)

//        {
//                    int currentSequenceNumber = 0;

//            if (currentSequenceNumber == 0)
//            {
//                currentSequenceNumber = _context.KhoNhapXuats.Count() + 1;
//            }

//            string currentDate = DateTime.Now.ToString("yyyyMM");
//            string newPhieu = $"PN{currentDate}{currentSequenceNumber:D6}";

//            var khoNhap = new KhoNhapXuat
//            {
//                MaPhieu = newPhieu,
//                TenPhieu = tenPhieu,
//                IdKhoNhap = idKhoNhap,
//                NoiDung = noiDung,
//                NhanVienNhan = nhanVienNhan,
//                NgayNhan = ngayNhan,
//                GhiChu = ghiChu,
//                TrangThai = trangThai,
//                IdDoiTac = idDoiTac
//            };

//            currentSequenceNumber++;
//            _context.KhoNhapXuats.Add(khoNhap);
//            _context.SaveChanges();

//            return khoNhap;
//        }

//        public KhoNhapXuat CreateKhoXuat(string tenPhieu, int idKhoXuat, string noiDung,
//                                  int nhanVienXuat, DateTime ngayXuat, string ghiChu,
//                                  int trangThai)
//        {
//            int currentSequenceNumber = 0;

//            if (currentSequenceNumber == 0)
//            {
//                currentSequenceNumber = _context.KhoNhapXuats.Count() + 1;
//            }

//            string currentDate = DateTime.Now.ToString("yyyyMM");
//            string newPhieu = $"PX{currentDate}{currentSequenceNumber:D6}";

//            var khoXuat = new KhoNhapXuat
//            {
//                MaPhieu = newPhieu,
//                TenPhieu = tenPhieu,
//                IdKhoXuat = idKhoXuat,
//                NoiDung = noiDung,
//                NhanVienXuat = nhanVienXuat,
//                NgayXuat = ngayXuat,
//                GhiChu = ghiChu,
//                TrangThai = trangThai,
//                // Các trường dữ liệu được gán null hoặc giá trị từ trường nhập
//                IdKhoNhap = idKhoXuat, // IdKhoNhap sẽ là IdKhoXuat
//                NhanVienNhan = nhanVienXuat, // NhanVienNhan sẽ là NhanVienXuat
//                NgayNhan = ngayXuat // NgayNhan sẽ là NgayXuat
//            };

//            currentSequenceNumber++;

//            _context.KhoNhapXuats.Add(khoXuat);
//            _context.SaveChanges();

//            return khoXuat;
//        }


//    }
//}
using System;
using Microsoft.EntityFrameworkCore;
using _315HealthCareProject.Data;
using _315HealthCareProject.Models;

namespace _315HealthCareProject.Services
{
    public class KhoNhapXuatService : IKhoNhapXuatService
    {
        private readonly ApplicationDbContext _context;

        public KhoNhapXuatService(ApplicationDbContext context)
        {
            _context = context;
        }

        //public KhoNhapXuat CreateKhoNhap(string tenPhieu, string noiDung, int trangThai)
        public KhoNhapXuat CreateKhoNhap(string tenPhieu, string noiDung, int trangThai)
        {
            int currentSequenceNumber = 0;

            if (currentSequenceNumber == 0)
            {
                currentSequenceNumber = _context.KhoNhapXuats.Count() + 1;
            }

            string currentDate = DateTime.Now.ToString("yyyyMM");
            string newPhieu = $"PN{currentDate}{currentSequenceNumber:D6}";

            var khoNhap = new KhoNhapXuat
            {
                MaPhieu = newPhieu,
                TenPhieu = tenPhieu,
                NoiDung = noiDung,
                TrangThai = trangThai
            };

            currentSequenceNumber++;
            _context.KhoNhapXuats.Add(khoNhap);
            _context.SaveChanges();

            return khoNhap;
        }

        public KhoNhapXuat CreateKhoXuat(string tenPhieu, string noiDung, int trangThai)
        {
            int currentSequenceNumber = 0;

            if (currentSequenceNumber == 0)
            {
                currentSequenceNumber = _context.KhoNhapXuats.Count() + 1;
            }

            string currentDate = DateTime.Now.ToString("yyyyMM");
            string newPhieu = $"PX{currentDate}{currentSequenceNumber:D6}";

            var khoXuat = new KhoNhapXuat
            {
                MaPhieu = newPhieu,
                TenPhieu = tenPhieu,
                NoiDung = noiDung,
                TrangThai = trangThai
            };

            currentSequenceNumber++;
            _context.KhoNhapXuats.Add(khoXuat);
            _context.SaveChanges();

            return khoXuat;
        }

    }
}
