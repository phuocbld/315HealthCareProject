using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services
{
    public class ThuocVatTuService : IThuocVatTuService
    {
        private readonly IThuocVatTuRepository _repository;
        private readonly ApplicationDbContext _context;

        public ThuocVatTuService(IThuocVatTuRepository repository , ApplicationDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<List<ThuocVatTu>> GetAllThuocVatTuAsync()
        {
            return await _repository.GetAllThuocVatTuAsync();
        }

        public async Task<IEnumerable<ThuocVatTu>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }


        public async Task<ThuocVatTu> CreateThuocVatTu(string maThuoc, string tenBietDuoc, string tenHoatChat, string dvt)
        {
            return await _repository.CreateThuocVatTu(maThuoc, tenBietDuoc, tenHoatChat, dvt);
        }

        public async Task<ThuocVatTu> GetThuocVatTuByIdAsync(int id)
        {
            return await _repository.GetThuocVatTuByIdAsync(id);
        }

        public async Task<ThuocVatTu> UpdateThuocVatTuAsync(int id, ThuocVatTu thuocVatTu)
        {
            var existingThuocVatTu = await _repository.GetThuocVatTuByIdAsync(id);
            if (existingThuocVatTu == null)
            {
                throw new ArgumentException($"Không tìm thấy ThuocVatTu với ID {id}");
            }

            existingThuocVatTu.TenBietDuoc = thuocVatTu.TenBietDuoc;
            existingThuocVatTu.TenHoatChat = thuocVatTu.TenHoatChat;
            existingThuocVatTu.Dvt = thuocVatTu.Dvt;
            existingThuocVatTu.DonGia = thuocVatTu.DonGia;
            existingThuocVatTu.QuyCach = thuocVatTu.QuyCach;
            existingThuocVatTu.NongDo  = thuocVatTu.NongDo;
            existingThuocVatTu.HamLuong = thuocVatTu.HamLuong;
            existingThuocVatTu.DuongDung = thuocVatTu.DuongDung;
            existingThuocVatTu.NuocSanXuat = thuocVatTu.NuocSanXuat;
            existingThuocVatTu.NhaSanXuat = thuocVatTu.NhaSanXuat;
            existingThuocVatTu.SuDung = thuocVatTu.SuDung;
            existingThuocVatTu.GhiChu = thuocVatTu.GhiChu;
            existingThuocVatTu.IdCt = thuocVatTu.IdCt;
            existingThuocVatTu.Barcode = thuocVatTu.Barcode;
            existingThuocVatTu.QrCode = thuocVatTu.QrCode;
            existingThuocVatTu.CachDung = thuocVatTu.CachDung;
            existingThuocVatTu.MaSoDangKy = thuocVatTu.MaSoDangKy;
            existingThuocVatTu.DonViChan = thuocVatTu.DonViChan;
            existingThuocVatTu.ChuyenKhoa = thuocVatTu.ChuyenKhoa;
            existingThuocVatTu.TenDoiTac = thuocVatTu.TenDoiTac;
            existingThuocVatTu.DonViDung = thuocVatTu.DonViDung;
            existingThuocVatTu.IdNhom = thuocVatTu.IdNhom;
            existingThuocVatTu.NguoiTao = thuocVatTu.NguoiTao;
            existingThuocVatTu.NgayTao = thuocVatTu.NgayTao;
            existingThuocVatTu.NguoiCapNhat = thuocVatTu.NguoiCapNhat;
            existingThuocVatTu.NgayCapNhat = thuocVatTu.NgayCapNhat;
            existingThuocVatTu.PtVatBanLe = thuocVatTu.PtVatBanLe;
            existingThuocVatTu.PtVatNhap = thuocVatTu.PtVatNhap;
            existingThuocVatTu.PtVatToa = thuocVatTu.PtVatToa;
            existingThuocVatTu.QuyCachDongGoi = thuocVatTu.QuyCachDongGoi;
            await _repository.UpdateAsync(existingThuocVatTu);
            return existingThuocVatTu;
        }

    }
}
