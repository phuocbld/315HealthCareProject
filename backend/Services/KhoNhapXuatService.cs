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

        public KhoNhapXuat CreateKhoNhap(string tenPhieu, string noiDung, int trangThai)
        {
            int currentSequenceNumber = 0;

            if (currentSequenceNumber == 0)
            {
                currentSequenceNumber = _context.KhoNhapXuats.Count() + 1;
            }

            string currentDate = DateTime.Now.ToString("yyyyMM");
            string newPhieu = $"PNOA{currentDate}{currentSequenceNumber:D6}";

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
            string newPhieu = $"CKOA{currentDate}{currentSequenceNumber:D6}";

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
