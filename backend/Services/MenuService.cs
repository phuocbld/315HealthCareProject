using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _315HealthCareProject.Services
{
    public class MenuService
    {
        private readonly ApplicationDbContext _context;

        public MenuService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<NguoiDungNhomMenu> GetMenuForUser(string taiKhoan)
        {
            return _context.NGUOIDUNG_MENU_PERMISSION
                .Where(menu => menu.TaiKhoan == taiKhoan)
                .Select(menu => new NguoiDungNhomMenu
                {
                    TaiKhoan = menu.TaiKhoan,
                    IDMenu = menu.IDMenu,
                    TenMenu = menu.TenMenu,
                    IDMenuCha = menu.IDMenuCha,
                    CHILD_MENUS = menu.CHILD_MENUS
                })
                .ToList();
        }
    }
}

