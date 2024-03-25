using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _315HealthCareProject.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _315HealthCareProject.Models;
using _315HealthCareProject.Services;

namespace _315HealthCareProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuController : ControllerBase
    {
        private readonly MenuService _menuService;

        public MenuController(MenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpGet("{taiKhoan}")]
        public ActionResult<List<NguoiDungNhomMenu>> GetMenu(string taiKhoan)
        {
            var menu = _menuService.GetMenuForUser(taiKhoan);
            if (menu == null)
            {
                return NotFound();
            }
            return menu;
        }
    }
}



