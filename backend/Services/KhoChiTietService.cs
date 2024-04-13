using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services
{
    public class KhoChiTietService : IKhoChiTietService
    {
        private readonly IKhoChiTietRepository _khoChiTietRepository;

        public KhoChiTietService(IKhoChiTietRepository khoChiTietRepository)
        {
            _khoChiTietRepository = khoChiTietRepository;
        }

        public async Task AddKhoChiTietListAsync(List<KhoChiTiet> khoChiTietList)
        {
            try
            {
                foreach (var khoChiTiet in khoChiTietList)
                {
                    if (khoChiTiet.Vat5 == null && khoChiTiet.Vat8 == null && khoChiTiet.Vat10 == null)
                    {
                        khoChiTiet.Vat5 = 1;
                    }

                    await _khoChiTietRepository.AddKhoChiTietAsync(khoChiTiet);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding kho chi tiet: " + ex.Message);
            }
        }

        public async Task<IEnumerable<KhoChiTiet>> GetKhoChiTietByNhapXuatIdAsync(int idNhapXuat)
        {
            return await _khoChiTietRepository.GetKhoChiTietByNhapXuatIdAsync(idNhapXuat);
        }
    }
}
