//using System.Threading.Tasks;
//using _315HealthCareProject.DTO;

//namespace _315HealthCareProject.Services
//{
//    public class AuthService : IAuthService
//    {
//        private readonly INhanVienService _nhanVienService;

//        public AuthService(INhanVienService nhanVienService)
//        {
//            _nhanVienService = nhanVienService;
//        }

//        public async Task<DangNhapDTO> CreateOrUpdateDangNhap(LoginDTO loginRequest)
//        {
//            var dangNhapDTO = new DangNhapDTO();

//            // Gọi phương thức GetTenNhanVien từ _nhanVienService
//            var tenNhanVien = _nhanVienService.GetTenNhanVien(dangNhapDTO.IDNhanVien);

//            // Gán tên nhân viên vào DTO
//            dangNhapDTO.TenNV = tenNhanVien;

//            return dangNhapDTO;
//        }
//    }
//}
