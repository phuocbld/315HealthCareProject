using _315HealthCareProject.Services.Interface;

namespace _315HealthCareProject.Services
{
    public class TimeComparisonService :ITimeComparisonService
    {
        public int CompareTimeAndCalculateIDCaLamViec(DateTimeOffset thoiGianDangNhap)
        {
            // Chuyển đổi thời gian từ DateTimeOffset sang DateTime
            DateTime thoiGianDangNhapDateTime = thoiGianDangNhap.UtcDateTime;
       


            // Tính toán IDCaLamViec dựa trên thời gian DangNhap
            int idCaLamViec = TinhToanIDCaLamViec(thoiGianDangNhapDateTime);

            return idCaLamViec;
        }

        private int TinhToanIDCaLamViec(DateTime thoiGianDangNhap)
        {
            // Tính toán IDCaLamViec dựa trên thời gian DangNhap
            TimeSpan gioDangNhap = thoiGianDangNhap.TimeOfDay;
            int idCaLamViec = 0;

            if (gioDangNhap >= new TimeSpan(7, 30, 0) && gioDangNhap < new TimeSpan(8, 30, 0))

            {
                idCaLamViec = 1;
            }
            if (gioDangNhap >= new TimeSpan(11, 30, 0) && gioDangNhap < new TimeSpan(12, 30, 0))
            {
                idCaLamViec = 2;
            }

            if (gioDangNhap >= new TimeSpan(16, 30, 0) && gioDangNhap < new TimeSpan(17, 30, 0))
            {
                idCaLamViec |= 3;
            }

            return idCaLamViec;
        }

        private string FormatDateTime(DateTime thoiGian)
        {
            return thoiGian.ToString("MMMM dd, yyyy h:mm tt");
        }
    }
}
    
