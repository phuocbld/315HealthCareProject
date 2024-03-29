using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _315HealthCareProject.Services
{
    public class NhanVienService : INhanVienService
    {
        private readonly ApplicationDbContext _context;

        public NhanVienService(ApplicationDbContext context)
        {
            _context = context;
        }


        public string GetTenNhanVien(int id)
        {
            var nhanVien = _context.NhanViens
                .Where(nv => nv.ID == id)
                .Select(d => d.TENNV)
                .FirstOrDefault();

            if (nhanVien == null)
            {
                return "Không tìm thấy nhân viên";
            }

            return nhanVien;
        }




    }
}
