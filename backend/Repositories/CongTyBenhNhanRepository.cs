using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Repositories
{
    public class CongTyBenhNhanRepository : ICongTyBenhNhanRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ICongTyKhachKhamDoanRepository _congTyKhachKhamDoanRepository;

        public CongTyBenhNhanRepository(ApplicationDbContext context, ICongTyKhachKhamDoanRepository congTyKhachKhamDoanRepository)
        {
            _context = context;
            _congTyKhachKhamDoanRepository = congTyKhachKhamDoanRepository;
        }

        public async Task<IEnumerable<CongTyBenhNhan>> GetAllAsync()
        {
            return await _context.CongTyBenhNhans.ToListAsync();
        }

        public async Task AddBenhNhanCongTyAsync(CongTyBenhNhan congTyBenhNhan)
        {
            _context.CongTyBenhNhans.Add(congTyBenhNhan);
            await _context.SaveChangesAsync();
        }

        public async Task<string> GenerateMaBNAsync(int idCT)
        {
            string currentDate = DateTime.Now.ToString("yy");
            string maCT = await _congTyKhachKhamDoanRepository.GetMaCTByIdCT(idCT);

            // Lấy ra số lượng bệnh nhân hiện tại của công ty
            int currentSequenceNumber = await _context.CongTyBenhNhans
                .Where(k => k.IDCT == idCT)
                .CountAsync();

            currentSequenceNumber++; // Tăng số lượng lên 1 để làm mã mới

            string uniqueNumber = currentSequenceNumber.ToString("D6");
            string newMaBN = $"{maCT}{currentDate}{uniqueNumber}";

            return newMaBN;
        }

        public async Task UpdateBenhNhanAsync(CongTyBenhNhan benhNhan)
        {
            _context.Entry(benhNhan).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task<CongTyBenhNhan> GetBenhNhanByIdAsync(int id)
        {
            return await _context.CongTyBenhNhans.FirstOrDefaultAsync(b => b.IDBN == id);
        }

        public async Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanByTenAsync(string ten)
        {
            return await _context.CongTyBenhNhans.Where(b => b.TENBN.Contains(ten)).ToListAsync();
        }
        public async Task DeleteBenhNhanAsync(int id)
        {
            var benhNhanDelete = await _context.CongTyBenhNhans.FindAsync(id);
            if (benhNhanDelete != null)
            {
                _context.CongTyBenhNhans.Remove(benhNhanDelete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<string> GetSoDienThoaiByIdAsync(int id)
        {
            var soDienThoai = await _context.CongTyBenhNhans
                .Where(b => b.IDBN == id)
                .Select(b => b.SODIENTHOAI)
                .FirstOrDefaultAsync();

            return soDienThoai;
        }


        public async Task<IEnumerable<CongTyBenhNhan>> GetPatientsToSendSmsAsync(int idCT)
        {
            return await _context.CongTyBenhNhans.Where(p => p.IDCT == idCT).ToListAsync();
        }

        public async Task UpdatePatientAsync(CongTyBenhNhan patient)
        {
            _context.Entry(patient).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

    }
}
