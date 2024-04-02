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

        public async Task<ThuocVatTu> CreateThuocVatTu(string maThuoc, string tenBietDuoc, string tenHoatChat, string dvt, string quyCach, int donGia, int idNhom)
        {

            var thuocVatTu = new ThuocVatTu
            {
                MaThuoc = maThuoc,
                TenBietDuoc = tenBietDuoc,
                TenHoatChat = tenHoatChat,
                Dvt = dvt,
                QuyCach = quyCach,
                DonGia = donGia,
                IdNhom = idNhom
            };

            _context.ThuocVatTus.Add(thuocVatTu);
            await _context.SaveChangesAsync();

            return thuocVatTu;
        }




    }
}
