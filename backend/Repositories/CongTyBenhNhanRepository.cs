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
            // Tạo mã BN
            string maCT = congTyBenhNhan.MACT;
            string maBN = await GenerateMaBNAsync(maCT);
            congTyBenhNhan.MABN = maBN;

            // Thêm bệnh nhân vào context và lưu thay đổi
            _context.CongTyBenhNhans.Add(congTyBenhNhan);
            await _context.SaveChangesAsync();
        }


        public async Task<string> GenerateMaBNAsync(string maCT)
        {
            // Kiểm tra xem mã CT có đúng định dạng không (6 ký tự)
            if (maCT.Length != 6)
            {
                throw new Exception("Mã CT không hợp lệ.");
            }

            string currentDate = DateTime.Now.ToString("yy");

            // Lấy ra số lượng bệnh nhân hiện tại của công ty
            int currentSequenceNumber = await _context.CongTyBenhNhans
                .Where(k => k.MABN.StartsWith(maCT + currentDate))
                .CountAsync();

            currentSequenceNumber++; 

   
            string uniqueNumber = currentSequenceNumber.ToString("D6");
            string newMaBN = $"{maCT}{currentDate}{uniqueNumber}";

            return newMaBN;
        }




        public async Task UpdateBenhNhanAsync(CongTyBenhNhan benhNhan)
        {

            if (benhNhan.KQXN != null)
            {
                benhNhan.TRANGTHAIKHAM = 2; // Nếu có KQXN thì TrangThaiKham là 2
            }
            else if (benhNhan.KQKHAM != null)
            {
                benhNhan.TRANGTHAIKHAM = 3; // Nếu có KQKham thì TrangThaiKham là 3
            }

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

        public async Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanByMaBNAsync(string maBN)
        {
            return await _context.CongTyBenhNhans.Where(b => b.MABN.Contains(maBN)).ToListAsync();
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


        public async Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanByIdCTAsync(int idCT)
        {
            return await _context.CongTyBenhNhans.Where(p => p.IDCT == idCT).ToListAsync();
        }

        public async Task UpdatePatientAsync(CongTyBenhNhan patient)
        {
            _context.Entry(patient).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<CongTyBenhNhan>> SearchBenhNhanAsync(string? keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
            {
                return await GetAllAsync(); 
            }
            else
            {
                keyword = keyword.ToLower(); 
                return await _context.CongTyBenhNhans.Where(b =>
                    b.TENBN.ToLower().Contains(keyword) || b.MABN.ToLower().Contains(keyword)
                ).ToListAsync();
            }
        }

        public async Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanBySoDienThoaiAsync(string soDienThoai)
        {
            return await _context.CongTyBenhNhans.Where(b => b.SODIENTHOAI.Contains(soDienThoai)).ToListAsync();
        }
    }
}
