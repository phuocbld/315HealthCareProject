using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace _315HealthCareProject.Repositories
{
    public class CongTyKhachKhamDoanRepository : ICongTyKhachKhamDoanRepository
    {
        private readonly ApplicationDbContext _context;

        public CongTyKhachKhamDoanRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CongTyKhachKhamDoan>> GetAllAsync()
        {
            return await _context.CongTyKhachKhamDoans.ToListAsync();
        }

        public async Task<CongTyKhachKhamDoan> AddAsync(CongTyKhachKhamDoan congTyKhachKhamDoan)
        {
            congTyKhachKhamDoan.MACT = GenerateUniqueMACT();

            _context.CongTyKhachKhamDoans.Add(congTyKhachKhamDoan);
            await _context.SaveChangesAsync();
            return congTyKhachKhamDoan;
        }
        private string GenerateUniqueMACT()
        {
            // Lấy ra mã số MACT lớn nhất hiện có trong cơ sở dữ liệu
            string maxMACT = _context.CongTyKhachKhamDoans
                                .OrderByDescending(ct => ct.MACT)
                                .Select(ct => ct.MACT)
                                .FirstOrDefault();

            // Nếu không có dữ liệu trong cơ sở dữ liệu, bắt đầu từ số 1
            if (string.IsNullOrEmpty(maxMACT))
            {
                return "IVY001";
            }

            // Tách phần số từ mã số MACT lớn nhất
            string numericPart = maxMACT.Substring(3); // Loại bỏ phần "IVY" 

            // Chuyển phần số thành kiểu số nguyên
            if (int.TryParse(numericPart, out int numericValue))
            {
                // Tăng giá trị số lên 1
                numericValue++;

                // Tạo lại phần số với đủ 3 chữ số
                string numericString = numericValue.ToString("D3");

                // Tạo lại mã số MACT mới từ phần tự tăng đã tăng lên
                string newMACT = "IVY" + numericString;

                return newMACT;
            }
            else
            {
                // Trường hợp không chuyển đổi được phần số thành kiểu số nguyên
                // Thực hiện một xử lý lỗi phù hợp hoặc trả về một giá trị mặc định
                throw new InvalidOperationException("Không thể tạo mã số MACT mới.");
            }
        }



        public async Task<CongTyKhachKhamDoan> GetByIdAsync(int id)
        {
            return await _context.CongTyKhachKhamDoans.FindAsync(id);
        }
        public async Task<CongTyKhachKhamDoan> UpdateAsync(int id, CongTyKhachKhamDoan congTyKhachKhamDoan)
        {
            var existingCongTy = await _context.CongTyKhachKhamDoans.FindAsync(id);
            if (existingCongTy != null)
            {
                existingCongTy.MACT = congTyKhachKhamDoan.MACT;
                existingCongTy.TENCT = congTyKhachKhamDoan.TENCT;
                existingCongTy.DIACHI = congTyKhachKhamDoan.DIACHI;
                existingCongTy.DIENTHOAI = congTyKhachKhamDoan.DIENTHOAI;
                existingCongTy.FAX = congTyKhachKhamDoan.FAX;
                existingCongTy.EMAIL = congTyKhachKhamDoan.EMAIL;
                existingCongTy.WEBSITE = congTyKhachKhamDoan.WEBSITE;
                existingCongTy.GHICHU = congTyKhachKhamDoan.GHICHU;
                existingCongTy.NGAYTAO = congTyKhachKhamDoan.NGAYTAO;
                existingCongTy.NGUOITAO = congTyKhachKhamDoan.NGUOITAO;
                existingCongTy.NGAYSUA = congTyKhachKhamDoan.NGAYSUA;
                existingCongTy.NGUOISUA = congTyKhachKhamDoan.NGUOISUA;

                await _context.SaveChangesAsync();
            }
            return existingCongTy;
        }
        public async Task<string> GetMaCTByIdCT(int idCT)
        {
            var congTyKhachKhamDoan = await _context.CongTyKhachKhamDoans
                .FirstOrDefaultAsync(ct => ct.IDCT == idCT);

            if (congTyKhachKhamDoan != null)
            {
                return congTyKhachKhamDoan.MACT;
            }

            return null;
        }

        public async Task<int?> GetIDCTByMACT(string maCT)
        {
            var congTyKhachKhamDoan = await _context.CongTyKhachKhamDoans
                .FirstOrDefaultAsync(ct => ct.MACT == maCT);

            if (congTyKhachKhamDoan != null)
            {
                return congTyKhachKhamDoan.IDCT;
            }

            return null;
        }

        public async Task<string> GetTenCTByMACT(string maCT)
        {
            var congTyKhachKhamDoan = await _context.CongTyKhachKhamDoans
                .FirstOrDefaultAsync(ct => ct.MACT == maCT);

            if (congTyKhachKhamDoan != null)
            {
                return congTyKhachKhamDoan.TENCT;
            }

            return null;
        }

        public async Task<string> GetTenCTByIdAsync(int id)
        {
            var tenCT = await _context.CongTyKhachKhamDoans
                .Where(ct => ct.IDCT == id)
                .Select(ct => ct.TENCT)
                .FirstOrDefaultAsync();

            return tenCT;
        }

        public async Task<string> GetMaCTByIdAsync(int id)
        {
            var tenCT = await _context.CongTyKhachKhamDoans
                .Where(ct => ct.IDCT == id)
                .Select(ct => ct.MACT)
                .FirstOrDefaultAsync();

            return tenCT;
        }
        public async Task DeleteAsync(int id)
        {
            var congTyDelete = await _context.CongTyKhachKhamDoans.FindAsync(id);
            if (congTyDelete != null)
            {
                _context.CongTyKhachKhamDoans.Remove(congTyDelete);
                await _context.SaveChangesAsync();
            }
        }

    }
}
