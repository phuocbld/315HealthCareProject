using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace _315HealthCareProject.Repositories
{
    public class KhoNhapXuatRepository : IKhoNhapXuatRepository
    {
        private readonly ApplicationDbContext _context;

        public KhoNhapXuatRepository(ApplicationDbContext context)
        {
            _context = context;
        }
     
        public async Task<IEnumerable<KhoNhapXuat>> GetAllPhieuNhapAsync()
        {
            return await _context.KhoNhapXuats
                .Where(k => k.MaPhieu.StartsWith("PN") && k.CheckDelete != 1)
                .ToListAsync();
        }

        public async Task<IEnumerable<KhoNhapXuat>> GetAllPhieuXuatAsync()
        {
            return await _context.KhoNhapXuats
                .Where(k => k.MaPhieu.StartsWith("CK") && k.CheckDelete != 1)
                .ToListAsync();
        }

        public async Task<IEnumerable<KhoNhapXuat>> GetAllKhoNhapXuatAsync()
        {
            return await _context.KhoNhapXuats
                .Where(k => k.CheckDelete != 1)
                .ToListAsync();
        }

        public async Task<KhoNhapXuat> GetKhoNhapXuatByIdAsync(int id)
        {
            return await _context.KhoNhapXuats
                .FirstOrDefaultAsync(k => k.IdNhapXuat == id && k.CheckDelete != 1);
        }

        public async Task UpdateAsync(KhoNhapXuat khoNhapXuat)
        {
            _context.Entry(khoNhapXuat).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }




        public async Task DeleteAsync(int idNhapXuat)
        {
            var khoNhapXuat = await _context.KhoNhapXuats.FindAsync(idNhapXuat);

            if (khoNhapXuat != null)
            {
                khoNhapXuat.CheckDelete = 1;
                _context.KhoNhapXuats.Update(khoNhapXuat);
                var khoChiTiets = await _context.KhoChiTiets.Where(k => k.IdNhapXuat == idNhapXuat).ToListAsync();
                foreach (var khoChiTiet in khoChiTiets)
                {
                    khoChiTiet.CheckDelete = 1;
                    _context.KhoChiTiets.Update(khoChiTiet);
                }

                await _context.SaveChangesAsync();
            }
        }


        

        public async Task<string> GetTenKhoAsync(int idKhoCN)
        {
            var tenKho = await _context.KhoChiNhanhs
                .Where(kcn => kcn.IdKhoCN == idKhoCN)
                .Join(_context.Khos, kcn => kcn.IdKho, k => k.IdKho, (kcn, k) => k.TenKho)
                .FirstOrDefaultAsync();

            return tenKho;
        }

        public async Task<string> GetTenNVAsync(int idNhanVien)
        {
            var tenNV = await _context.NhanViens
                .Where(nv => nv.ID == idNhanVien)
                .Select(nv => nv.TENNV)
                .FirstOrDefaultAsync();

            return tenNV;
        }

        public async Task<string> GetTrangThaiAsync(int idTrangThai)
        {
            var trangThai = await _context.TrangThaiChuyenKhos
                .Where(tt => tt.IdTTCK == idTrangThai)
                .Select(tt => tt.TrangThai)
                .FirstOrDefaultAsync();

            return trangThai;
        }
        public async Task<string> GetTenChiNhanhAsync(int idKhoCN)
        {
            var tenChiNhanh = await _context.KhoChiNhanhs
                .Where(kcn => kcn.IdKhoCN == idKhoCN)
                .Join(_context.ChiNhanhs, kcn => kcn.IdCN, cn => cn.IdChiNhanh, (kcn, cn) => cn.TenChiNhanh)
                .FirstOrDefaultAsync();

            return tenChiNhanh;
        }



        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuNhapByTimeAndBranchAsync(DateTime fromDate, DateTime toDate, int idChiNhanh)
        {
            return await _context.KhoNhapXuats
                .Where(k => k.NgayNhan >= fromDate && k.NgayNhan <= toDate && k.CheckDelete != 1 && k.MaPhieu.StartsWith("PN0A"))
                .Join(_context.KhoChiNhanhs, k => k.IdKhoNhap, kc => kc.IdKhoCN, (k, kc) => new { KhoNhapXuat = k, KhoChiNhanh = kc })
                .Where(joinResult => joinResult.KhoChiNhanh.IdCN == idChiNhanh)
                .Select(joinResult => joinResult.KhoNhapXuat)
                .ToListAsync();
        }


        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuNhapByTimeAsync(DateTime fromDate, DateTime toDate)
        {
            return await _context.KhoNhapXuats
                .Where(k => k.NgayNhan >= fromDate && k.NgayNhan <= toDate && k.CheckDelete != 1 && k.MaPhieu.StartsWith("PN0A"))
                .ToListAsync();
        }

        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuNhapByIdChiNhanhAsync(int idChiNhanh)
        {
            return await _context.KhoNhapXuats
                .Join(_context.KhoChiNhanhs,
                    k => k.IdKhoNhap,
                    kc => kc.IdKhoCN,
                    (k, kc) => new { KhoNhapXuat = k, KhoChiNhanh = kc })
                .Where(joinResult => joinResult.KhoChiNhanh.IdCN == idChiNhanh
                                   && joinResult.KhoNhapXuat.CheckDelete != 1
                                   && joinResult.KhoNhapXuat.MaPhieu.StartsWith("PN"))
                .Select(joinResult => joinResult.KhoNhapXuat)
                .ToListAsync();
        }


        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuXuatByIdChiNhanhAsync(int idChiNhanh)
        {
            return await _context.KhoNhapXuats
                .Join(_context.KhoChiNhanhs,
                    k => k.IdKhoXuat,
                    kc => kc.IdKhoCN,
                    (k, kc) => new { KhoNhapXuat = k, KhoChiNhanh = kc })
                .Where(joinResult => joinResult.KhoChiNhanh.IdCN == idChiNhanh && joinResult.KhoNhapXuat.CheckDelete != 1 && joinResult.KhoNhapXuat.MaPhieu.StartsWith("CK"))
                .Select(joinResult => joinResult.KhoNhapXuat)
                .ToListAsync();
        }
        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuXuatByTimeAsync(DateTime fromDate, DateTime toDate)
        {
            return await _context.KhoNhapXuats
                .Where(k => k.NgayXuat >= fromDate && k.NgayXuat <= toDate && k.CheckDelete != 1 && k.MaPhieu.StartsWith("CK"))
                .ToListAsync();
        }

        public async Task<IEnumerable<KhoNhapXuat>> GetPhieuXuatByTimeAndBranchAsync(DateTime fromDate, DateTime toDate, int idChiNhanh)
        {
            return await _context.KhoNhapXuats
                .Where(k => k.NgayXuat >= fromDate && k.NgayXuat <= toDate && k.CheckDelete != 1 && k.MaPhieu.StartsWith("CK"))
                .Join(_context.KhoChiNhanhs, k => k.IdKhoNhap, kc => kc.IdKhoCN, (k, kc) => new { KhoNhapXuat = k, KhoChiNhanh = kc })
                .Where(joinResult => joinResult.KhoChiNhanh.IdCN == idChiNhanh)
                .Select(joinResult => joinResult.KhoNhapXuat)
                .ToListAsync();
        }
    }
}

