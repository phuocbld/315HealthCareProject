using System;
using Microsoft.EntityFrameworkCore;
using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using _315HealthCareProject.Repositories.Interface;

namespace _315HealthCareProject.Services
{
    public class KhoNhapXuatService : IKhoNhapXuatService
    {
        private readonly ApplicationDbContext _context;
        private readonly IKhoNhapXuatRepository _repository;

        public KhoNhapXuatService(ApplicationDbContext context , IKhoNhapXuatRepository repository)
        {
            _context = context;
            _repository = repository;
        }

             public async Task<KhoNhapXuat> CreateKhoNhap(string tenPhieu, string noiDung, int trangThai )
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
                TenPhieu = tenPhieu,
                NoiDung = noiDung,
                TrangThai = trangThai
            };

            _context.KhoNhapXuats.Add(khoNhap);
            await _context.SaveChangesAsync();

            return khoNhap;
        }

        public async Task<KhoNhapXuat> CreateKhoXuat(string tenPhieu, string noiDung, int trangThai)
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
                TenPhieu = tenPhieu,
                NoiDung = noiDung,
                TrangThai = trangThai
            };

            _context.KhoNhapXuats.Add(khoXuat);
            await _context.SaveChangesAsync();

            return khoXuat;
        }


        public async Task<IEnumerable<KhoNhapXuat>> GetAllPhieuNhapAsync()
        {
            return await _repository.GetAllPhieuNhapAsync();
        }

        public async Task<IEnumerable<KhoNhapXuat>> GetAllPhieuXuatAsync()
        {
            return await _repository.GetAllPhieuXuatAsync();
        }

        public async Task<IEnumerable<KhoNhapXuat>> GetAllPhieuNhapXuatAsync()
        {
            return await _repository.GetAllPhieuNhapXuatAsync();
        }
    }
}
