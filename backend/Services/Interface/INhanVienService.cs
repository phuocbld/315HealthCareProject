using _315HealthCareProject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace _315HealthCareProject.Services.Interface
{
    public interface INhanVienService
    {
        string GetTenNhanVien(int id);
    }
}
