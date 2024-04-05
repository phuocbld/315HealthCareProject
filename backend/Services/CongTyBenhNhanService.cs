using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services
{
    public class CongTyBenhNhanService : ICongTyBenhNhanService
    {
        private readonly ICongTyBenhNhanRepository _repository;
        private readonly ApplicationDbContext _context;

        public CongTyBenhNhanService(ICongTyBenhNhanRepository repository, ApplicationDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<IEnumerable<CongTyBenhNhan>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task AddBenhNhanListAsync(List<CongTyBenhNhan> benhNhanList)
        {
            try
            {
                foreach (var benhNhanCongTy in benhNhanList)
                {
                    // Code để tạo mã bệnh nhân
                    int idCT = benhNhanCongTy.IDCT;
                    benhNhanCongTy.MABN = await _repository.GenerateMaBNAsync(idCT);

                    await _repository.AddBenhNhanCongTyAsync(benhNhanCongTy);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding bệnh nhân: " + ex.Message);
            }
        }

        public async Task UpdateBenhNhanAsync(CongTyBenhNhan benhNhan)
        {
            try
            {
                _context.Entry(benhNhan).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating bệnh nhân: " + ex.Message);
            }
        }

    }
}
