using System;
using Microsoft.EntityFrameworkCore;
using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.DTO;
using _315HealthCareProject.Repositories;

namespace _315HealthCareProject.Services
{
    public class KhoNhapXuatService : IKhoNhapXuatService
    {
        private readonly ApplicationDbContext _context;
        private readonly IKhoNhapXuatRepository _repository;
        private readonly ICongTyRepository _congTyRepository;


        public KhoNhapXuatService(ApplicationDbContext context, IKhoNhapXuatRepository repository , ICongTyRepository congTyRepository)
        {
            _context = context;
            _repository = repository;
            _congTyRepository = congTyRepository;
        }



        public async Task<KhoNhapXuat> CreateKhoNhap(string tenPhieu)
        {
            string currentDate = DateTime.Now.ToString("yyMM");

            string maxMaPhieu = await _context.KhoNhapXuats
                .Where(k => EF.Functions.Like(k.MaPhieu, $"PN0A{currentDate}%"))
                .MaxAsync(k => k.MaPhieu);

            int currentSequenceNumber = 1;
            if (!string.IsNullOrEmpty(maxMaPhieu))
            {
                string lastDigits = maxMaPhieu.Substring(8);
                if (int.TryParse(lastDigits, out currentSequenceNumber))
                {
                    currentSequenceNumber++;
                }
            }

            string uniqueNumber = currentSequenceNumber.ToString("D6");
            string newPhieu = $"PN0A{currentDate}{uniqueNumber}";

            var khoNhap = new KhoNhapXuat
            {
                MaPhieu = newPhieu,
                TenPhieu = tenPhieu
            };

            _context.KhoNhapXuats.Add(khoNhap);
            await _context.SaveChangesAsync();

            return khoNhap;
        }

        public async Task<KhoNhapXuat> CreateKhoXuat(string tenPhieu)
        {
            string currentDate = DateTime.Now.ToString("yyMM");

            string maxMaPhieu = await _context.KhoNhapXuats
                .Where(k => EF.Functions.Like(k.MaPhieu, $"CK0A{currentDate}%"))
                .MaxAsync(k => k.MaPhieu);

            int currentSequenceNumber = 1;
            if (!string.IsNullOrEmpty(maxMaPhieu))
            {
                string lastDigits = maxMaPhieu.Substring(8);
                if (int.TryParse(lastDigits, out currentSequenceNumber))
                {
                    currentSequenceNumber++;
                }
            }

            string uniqueNumber = currentSequenceNumber.ToString("D6");
            string newPhieu = $"CK0A{currentDate}{uniqueNumber}";

            var khoXuat = new KhoNhapXuat
            {
                MaPhieu = newPhieu,
                TenPhieu = tenPhieu
                
        };

            _context.KhoNhapXuats.Add(khoXuat);
            await _context.SaveChangesAsync();

            return khoXuat;
        }


        public async Task<IEnumerable<KhoNhapXuat>> GetAllPhieuNhapAsync()
        {
            var khoNhapXuatList = await _repository.GetAllPhieuNhapAsync();
            foreach (var khoNhapXuat in khoNhapXuatList)
            {
                khoNhapXuat.TenKhoNhap = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenKhoXuat = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenNVNhan = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienNhan ?? 0);
                khoNhapXuat.TenNVXuat = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienXuat ?? 0);
                khoNhapXuat.TenTrangThai = await _repository.GetTrangThaiAsync(khoNhapXuat.TrangThai ?? 0);
                khoNhapXuat.TenChiNhanhNhan = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenChiNhanhXuat = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenCT = await _repository.GetTenCTAsync(khoNhapXuat.IDCT ?? 0);
            }
            return khoNhapXuatList;
        }

        public async Task<IEnumerable<KhoNhapXuat>> GetAllPhieuXuatAsync()
        {
            var khoNhapXuatList = await _repository.GetAllPhieuXuatAsync();
            foreach (var khoNhapXuat in khoNhapXuatList)
            {
                khoNhapXuat.TenKhoNhap = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenKhoXuat = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenNVNhan = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienNhan ?? 0);
                khoNhapXuat.TenNVXuat = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienXuat ?? 0);
                khoNhapXuat.TenTrangThai = await _repository.GetTrangThaiAsync(khoNhapXuat.TrangThai ?? 0);
                khoNhapXuat.TenChiNhanhNhan = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenChiNhanhXuat = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenCT = await _repository.GetTenCTAsync(khoNhapXuat.IDCT ?? 0);
            }
            return khoNhapXuatList;
        }


        public async Task<IEnumerable<KhoNhapXuat>> GetAllKhoNhapXuatAsync()
        {
            var khoNhapXuatList = await _repository.GetAllKhoNhapXuatAsync();

            foreach (var khoNhapXuat in khoNhapXuatList)
            {
                int idKhoNhap = khoNhapXuat.IdKhoNhap ?? 0;
                int idKhoXuat = khoNhapXuat.IdKhoXuat ?? 0;
                int idNhanVienNhan = khoNhapXuat.NhanVienNhan ?? 0;
                int idNhanVienXuat = khoNhapXuat.NhanVienXuat ?? 0;
                int idTrangThai = khoNhapXuat.TrangThai ?? 0;

                khoNhapXuat.TenKhoNhap = await _repository.GetTenKhoAsync(idKhoNhap);
                khoNhapXuat.TenKhoXuat = await _repository.GetTenKhoAsync(idKhoXuat);
                khoNhapXuat.TenNVNhan = await _repository.GetTenNVAsync(idNhanVienNhan);
                khoNhapXuat.TenNVXuat = await _repository.GetTenNVAsync(idNhanVienXuat);
                khoNhapXuat.TenTrangThai = await _repository.GetTrangThaiAsync(idTrangThai);
                khoNhapXuat.TenChiNhanhNhan = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenChiNhanhXuat = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenCT =  _congTyRepository.GetTenCTById(khoNhapXuat.IDCT ?? 0);
            }

            return khoNhapXuatList;
        }


        public async Task<KhoNhapXuat> GetKhoNhapXuatByIdAsync(int id)
        {
            var khoNhapXuat = await _repository.GetKhoNhapXuatByIdAsync(id);
            if (khoNhapXuat != null)
            {
                khoNhapXuat.TenKhoNhap = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenKhoXuat = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenNVNhan = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienNhan ?? 0);
                khoNhapXuat.TenNVXuat = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienXuat ?? 0);
                khoNhapXuat.TenTrangThai = await _repository.GetTrangThaiAsync(khoNhapXuat.TrangThai ?? 0);
                khoNhapXuat.TenChiNhanhNhan = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenChiNhanhXuat = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenCT = await _repository.GetTenCTAsync(khoNhapXuat.IDCT ?? 0);

            }
            return khoNhapXuat;
        }



        public async Task<KhoNhapXuat> UpdateKhoNhapXuatAsync(int id, KhoNhapXuat khoNhapXuat)
        {
            var existingKhoNhapXuat = await _repository.GetKhoNhapXuatByIdAsync(id);
            if (existingKhoNhapXuat == null)
            {
                throw new ArgumentException($"Không tìm thấy ThuocVatTu với ID {id}");
            }

            existingKhoNhapXuat.TenPhieu = khoNhapXuat.TenPhieu ?? existingKhoNhapXuat.TenPhieu;
            existingKhoNhapXuat.IdKhoXuat = khoNhapXuat.IdKhoXuat ?? existingKhoNhapXuat.IdKhoXuat;
            existingKhoNhapXuat.IdKhoNhap = khoNhapXuat.IdKhoNhap ?? existingKhoNhapXuat.IdKhoNhap;
            existingKhoNhapXuat.NoiDung = khoNhapXuat.NoiDung ?? existingKhoNhapXuat.NoiDung;
            existingKhoNhapXuat.GhiChu = khoNhapXuat.GhiChu ?? existingKhoNhapXuat.GhiChu;
            existingKhoNhapXuat.NgayNhan = khoNhapXuat.NgayNhan ?? existingKhoNhapXuat.NgayNhan;
            existingKhoNhapXuat.NgayXuat = khoNhapXuat.NgayXuat ?? existingKhoNhapXuat.NgayXuat;
            existingKhoNhapXuat.DaNhan = khoNhapXuat.DaNhan ?? existingKhoNhapXuat.DaNhan;
            existingKhoNhapXuat.TrangThai = khoNhapXuat.TrangThai ?? existingKhoNhapXuat.TrangThai;
            existingKhoNhapXuat.IdDoiTac = khoNhapXuat.IdDoiTac ?? existingKhoNhapXuat.IdDoiTac;
            existingKhoNhapXuat.SoHoaDon = khoNhapXuat.SoHoaDon ?? existingKhoNhapXuat.SoHoaDon;
            existingKhoNhapXuat.NgayHoaDon = khoNhapXuat.NgayHoaDon ?? existingKhoNhapXuat.NgayHoaDon;
            existingKhoNhapXuat.LinkHoaDon = khoNhapXuat.LinkHoaDon ?? existingKhoNhapXuat.LinkHoaDon;
            existingKhoNhapXuat.FileHoaDon = khoNhapXuat.FileHoaDon ?? existingKhoNhapXuat.FileHoaDon;
            existingKhoNhapXuat.IdHinhThuc = khoNhapXuat.IdHinhThuc ?? existingKhoNhapXuat.IdHinhThuc;
            existingKhoNhapXuat.IdPhuongThuc = khoNhapXuat.IdPhuongThuc ?? existingKhoNhapXuat.IdPhuongThuc;
            existingKhoNhapXuat.NhanVienNhan = khoNhapXuat.NhanVienNhan ?? existingKhoNhapXuat.NhanVienNhan;
            existingKhoNhapXuat.NhanVienXuat = khoNhapXuat.NhanVienXuat ?? existingKhoNhapXuat.NhanVienXuat;

            await _repository.UpdateAsync(existingKhoNhapXuat);
            return existingKhoNhapXuat;
        }





        public async Task DeleteAsync(int idNhapXuat)
        {
            await _repository.DeleteAsync(idNhapXuat);
        }




         public async Task<string> GetTenKhoAsync(int idKhoCN)
        {
            return await _repository.GetTenKhoAsync(idKhoCN);
        }

        public async Task<string> GetTenNVAsync(int idNhanVien)
        {
            return await _repository.GetTenNVAsync(idNhanVien);
        }

        public async Task<string> GetTrangThaiAsync(int idTrangThai)
        {
            return await _repository.GetTrangThaiAsync(idTrangThai);
        }

        public async Task<string> GetTenChiNhanhAsync(int idKhoCN)
        {
            return await _repository.GetTenChiNhanhAsync(idKhoCN);
        }

        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuNhapByIdChiNhanhAsync(int idChiNhanh)
        {
            var khoNhapList = await _repository.GetPhieuNhapByIdChiNhanhAsync(idChiNhanh);
            foreach (var khoNhapXuat in khoNhapList)
            {
                khoNhapXuat.TenKhoNhap = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenKhoXuat = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenNVNhan = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienNhan ?? 0);
                khoNhapXuat.TenNVXuat = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienXuat ?? 0);
                khoNhapXuat.TenTrangThai = await _repository.GetTrangThaiAsync(khoNhapXuat.TrangThai ?? 0);
                khoNhapXuat.TenChiNhanhNhan = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenChiNhanhXuat = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenCT = await _repository.GetTenCTAsync(khoNhapXuat.IDCT ?? 0);
            }
            return khoNhapList;
        }


        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuNhapByTimeAndBranchAsync(DateTime fromDate, DateTime toDate, int idChiNhanh)
        {

            var khoNhapList = await _repository.GetPhieuNhapByTimeAndBranchAsync(fromDate, toDate, idChiNhanh);
            foreach (var khoNhapXuat in khoNhapList)
            {
                khoNhapXuat.TenKhoNhap = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenKhoXuat = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenNVNhan = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienNhan ?? 0);
                khoNhapXuat.TenNVXuat = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienXuat ?? 0);
                khoNhapXuat.TenTrangThai = await _repository.GetTrangThaiAsync(khoNhapXuat.TrangThai ?? 0);
                khoNhapXuat.TenChiNhanhNhan = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenChiNhanhXuat = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenCT = await _repository.GetTenCTAsync(khoNhapXuat.IDCT ?? 0);
            }
            return khoNhapList;
        }


        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuNhapByTimeAsync(DateTime fromDate, DateTime toDate)
        {
            var khoNhapList = await _repository.GetPhieuNhapByTimeAsync(fromDate, toDate);
            foreach (var khoNhapXuat in khoNhapList)
            {
                khoNhapXuat.TenKhoNhap = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenKhoXuat = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenNVNhan = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienNhan ?? 0);
                khoNhapXuat.TenNVXuat = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienXuat ?? 0);
                khoNhapXuat.TenTrangThai = await _repository.GetTrangThaiAsync(khoNhapXuat.TrangThai ?? 0);
                khoNhapXuat.TenChiNhanhNhan = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenChiNhanhXuat = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenCT = await _repository.GetTenCTAsync(khoNhapXuat.IDCT ?? 0);
            }
            return khoNhapList;
        }


        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuXuatByIdChiNhanhAsync(int idChiNhanh)
        {
            var khoNhapList = await _repository.GetPhieuXuatByIdChiNhanhAsync(idChiNhanh);
            foreach (var khoNhapXuat in khoNhapList)
            {
                khoNhapXuat.TenKhoNhap = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenKhoXuat = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenNVNhan = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienNhan ?? 0);
                khoNhapXuat.TenNVXuat = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienXuat ?? 0);
                khoNhapXuat.TenTrangThai = await _repository.GetTrangThaiAsync(khoNhapXuat.TrangThai ?? 0);
                khoNhapXuat.TenChiNhanhNhan = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenChiNhanhXuat = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenCT = await _repository.GetTenCTAsync(khoNhapXuat.IDCT ?? 0);
            }
            return khoNhapList;
        }


        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuXuatByTimeAndBranchAsync(DateTime fromDate, DateTime toDate, int idChiNhanh)
        {

            var khoNhapList = await _repository.GetPhieuXuatByTimeAndBranchAsync(fromDate, toDate, idChiNhanh);
            foreach (var khoNhapXuat in khoNhapList)
            {
                khoNhapXuat.TenKhoNhap = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenKhoXuat = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenNVNhan = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienNhan ?? 0);
                khoNhapXuat.TenNVXuat = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienXuat ?? 0);
                khoNhapXuat.TenTrangThai = await _repository.GetTrangThaiAsync(khoNhapXuat.TrangThai ?? 0);
                khoNhapXuat.TenChiNhanhNhan = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenChiNhanhXuat = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenCT = await _repository.GetTenCTAsync(khoNhapXuat.IDCT ?? 0);
            }
            return khoNhapList;
        }


        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuXuatByTimeAsync(DateTime fromDate, DateTime toDate)
        {
            var khoNhapList = await _repository.GetPhieuXuatByTimeAsync(fromDate, toDate);
            foreach (var khoNhapXuat in khoNhapList)
            {
                khoNhapXuat.TenKhoNhap = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenKhoXuat = await _repository.GetTenKhoAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenNVNhan = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienNhan ?? 0);
                khoNhapXuat.TenNVXuat = await _repository.GetTenNVAsync(khoNhapXuat.NhanVienXuat ?? 0);
                khoNhapXuat.TenTrangThai = await _repository.GetTrangThaiAsync(khoNhapXuat.TrangThai ?? 0);
                khoNhapXuat.TenChiNhanhNhan = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoNhap ?? 0);
                khoNhapXuat.TenChiNhanhXuat = await _repository.GetTenChiNhanhAsync(khoNhapXuat.IdKhoXuat ?? 0);
                khoNhapXuat.TenCT = await _repository.GetTenCTAsync(khoNhapXuat.IDCT ?? 0);
            }
            return khoNhapList;
        }

    }
}
