using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Services
{
    public class DangNhapService : IDangNhapService
    {
        private readonly ApplicationDbContext _context;

        public DangNhapService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DangNhap> CheckAndCreateDangNhapAsync(string taiKhoan, int chiNhanhDangNhap)
        {

            var nguoiDung = await _context.NguoiDungs.FirstOrDefaultAsync(nd => nd.TaiKhoan == taiKhoan);

            if (nguoiDung == null)
            {

                return null;
            }


            var existingDangNhap = await _context.DangNhaps.FirstOrDefaultAsync(dn => dn.IdNguoiDung == nguoiDung.IdNguoiDung

                                                                                        && dn.DangXuat == null);

            //&& dn.ThoiGianDangNhap.Date == DateTime.UtcNow.Date

            if (existingDangNhap == null)
            {
                // Case 1: Create new DangNhap record
                var newDangNhap = new DangNhap
                {
                    IdNguoiDung = nguoiDung.IdNguoiDung,
                    IdChiNhanh = chiNhanhDangNhap,
                    ThoiGianDangNhap = null,
                    IP = null,
                    IdPK = null,
                    IdCaLamViec = null,
                    DangXuat = null,
                    GhiChu = null
                };


                _context.DangNhaps.Add(newDangNhap);
                await _context.SaveChangesAsync();

                return newDangNhap;
            }
            else
            {
                // Case 2: Return existing DangNhap
                return existingDangNhap;
            }
        }


        public async Task<DangNhap> GetByIdAsync(int id)
        {
            return await _context.DangNhaps.FindAsync(id);
        }

        public async Task UpdateAsync(DangNhap dangNhap)
        {
            _context.Entry(dangNhap).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

    }
}
