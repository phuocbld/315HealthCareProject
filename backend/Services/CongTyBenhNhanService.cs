using _315HealthCareProject.Data;
using _315HealthCareProject.DTO;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;
using System.Text;
using static System.Net.WebRequestMethods;


namespace _315HealthCareProject.Services
{
    public class CongTyBenhNhanService : ICongTyBenhNhanService
    {
        private readonly ICongTyBenhNhanRepository _benhNhanCT;
        private readonly IFtpService _ftpService;
        private readonly ApplicationDbContext _context;
        private readonly ICongTyTrangThaiRepository _congTyTrangThai;
        private readonly ICongTyKhachKhamDoanRepository _congTyKhamDoan;
        private readonly ICongTyTrangThaiSMSRepository _congTyTrangThaiSMS;
        private readonly IFileService _fileService;

        public CongTyBenhNhanService(ICongTyBenhNhanRepository repository, ApplicationDbContext context,
            ICongTyTrangThaiRepository congTyTrangThai, ICongTyKhachKhamDoanRepository congTyKhamDoan,
            ICongTyTrangThaiSMSRepository congTyTrangThaiSMS, IFtpService ftpService , IFileService fileService)
        {
            _benhNhanCT = repository;
            _context = context;
            _congTyTrangThai = congTyTrangThai;
            _congTyKhamDoan = congTyKhamDoan;
            _ftpService = ftpService;
            _congTyTrangThaiSMS = congTyTrangThaiSMS;
            _fileService = fileService;
        }

        //public async Task<IEnumerable<CongTyBenhNhan>> GetAllAsync()
        //{
        //    return await _repository.GetAllAsync();
        //}

        public async Task AddBenhNhanListAsync(List<CongTyBenhNhan> benhNhanList)
        {
            try
            {
                foreach (var benhNhanCongTy in benhNhanList)
                {
                    // Code để tạo mã bệnh nhân
                    string maCT = benhNhanCongTy.MACT;
                    benhNhanCongTy.TRANGTHAIKHAM = 1;
                    benhNhanCongTy.TRANGTHAISMS = 1;
                    benhNhanCongTy.TENCT = await _congTyKhamDoan.GetTenCTByMACT(maCT);
                    benhNhanCongTy.TRANGTHAI = await _congTyTrangThai.GetTenTrangThaiByIdAsync(benhNhanCongTy.TRANGTHAIKHAM ?? 0);
                    benhNhanCongTy.TENTRANGTHAISMS = await _congTyTrangThaiSMS.GetTenTrangThaiSMSByIdAsync(benhNhanCongTy.TRANGTHAISMS ?? 0);
                    benhNhanCongTy.IDCT = await _congTyKhamDoan.GetIDCTByMACT(maCT);
                    await _benhNhanCT.AddBenhNhanCongTyAsync(benhNhanCongTy);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding bệnh nhân: " + ex.Message);
            }
        }

        //public async Task UpdateCongTyBenhNhan(CongTyBenhNhanDTO benhNhanDTO)
        //{
        //    try
        //    {
        //        var existingBenhNhan = await _context.CongTyBenhNhans.FindAsync(benhNhanDTO.IDBN);
        //        if (existingBenhNhan != null)
        //        {

        //            string kqxFilePath = null;
        //            if (benhNhanDTO.KQXNFile != null)
        //            {
        //                string kqxFileName = $"KQXN_{existingBenhNhan.MABN}.pdf";

        //                kqxFilePath = await _ftpService.UploadFileAsnyc(benhNhanDTO.KQXNFile, "KQXN", kqxFileName);
        //            }

        //            string kqkFilePath = null;
        //            if (benhNhanDTO.KQKhamFile != null)
        //            {
        //                string kqkFileName = $"KQKham_{existingBenhNhan.MABN}.pdf";
        //                kqkFilePath = await _ftpService.UploadFileAsnyc(benhNhanDTO.KQKhamFile, "KQKham", kqkFileName);
        //            }


        //            // Cập nhật trạng thái tương ứng
        //            existingBenhNhan.TRANGTHAIKHAM =
        //                !string.IsNullOrEmpty(kqxFilePath) ? 2 : (!string.IsNullOrEmpty(kqkFilePath) ? 3 : existingBenhNhan.TRANGTHAIKHAM);

        //            existingBenhNhan.TENBN = benhNhanDTO.TENBN ?? existingBenhNhan.TENBN;
        //            existingBenhNhan.GIOITINH = benhNhanDTO.GIOITINH ?? existingBenhNhan.GIOITINH;
        //            existingBenhNhan.NGAYSINH = benhNhanDTO.NGAYSINH ?? existingBenhNhan.NGAYSINH;
        //            existingBenhNhan.SODIENTHOAI = benhNhanDTO.SODIENTHOAI ?? existingBenhNhan.SODIENTHOAI;
        //            existingBenhNhan.GHICHU = benhNhanDTO.GHICHU ?? existingBenhNhan.GHICHU;
        //            existingBenhNhan.IDCT = benhNhanDTO.IDCT ?? existingBenhNhan.IDCT;
        //            existingBenhNhan.TRANGTHAISMS = benhNhanDTO.TRANGTHAISMS ?? existingBenhNhan.TRANGTHAISMS;
        //            existingBenhNhan.NGAYKQ = benhNhanDTO.NGAYKQ ?? existingBenhNhan.NGAYKQ;
        //            existingBenhNhan.NGUOIKQ = benhNhanDTO.NGUOIKQ ?? existingBenhNhan.NGUOIKQ;
        //            existingBenhNhan.NGAYTAO = benhNhanDTO.NGAYTAO ?? existingBenhNhan.NGAYTAO;
        //            existingBenhNhan.NGUOITAO = benhNhanDTO.NGUOITAO ?? existingBenhNhan.NGUOITAO;
        //            existingBenhNhan.NGUOIGUISMS = benhNhanDTO.NGUOIGUISMS ?? existingBenhNhan.NGUOIGUISMS;
        //            existingBenhNhan.NGAYGUISMS = benhNhanDTO.NGAYGUISMS ?? existingBenhNhan.NGAYGUISMS;



        //            existingBenhNhan.KQXN = !string.IsNullOrEmpty(kqxFilePath) ? Encoding.UTF8.GetBytes(kqxFilePath) : existingBenhNhan.KQXN;
        //            existingBenhNhan.KQKHAM = !string.IsNullOrEmpty(kqkFilePath) ? Encoding.UTF8.GetBytes(kqkFilePath) : existingBenhNhan.KQKHAM;


        //            await _context.SaveChangesAsync();

        //        }
        //        else
        //        {
        //            throw new Exception("Không tìm thấy bệnh nhân để cập nhật.");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Lỗi khi cập nhật thông tin bệnh nhân: " + ex.Message, ex);
        //    }
        //}


        public async Task UpdateCongTyBenhNhan(CongTyBenhNhanDTO benhNhanDTO)
        {
            try
            {
                var existingBenhNhan = await _context.CongTyBenhNhans.FindAsync(benhNhanDTO.IDBN);
                if (existingBenhNhan != null)
                {
                    string kqxFilePath = null;
                    string kqkFilePath = null;
                    string kqxFileName = $"KQXN_{existingBenhNhan.MABN}.pdf";
                    string kqkFileName = $"KQKham_{existingBenhNhan.MABN}.pdf";

                    if (benhNhanDTO.KQXNFile != null)
                    {
                        kqxFilePath = await _ftpService.UploadFileAsnyc(benhNhanDTO.KQXNFile, "KQXN", kqxFileName);
                    }

                    if (benhNhanDTO.KQKhamFile != null)
                    {
                        kqkFilePath = await _ftpService.UploadFileAsnyc(benhNhanDTO.KQKhamFile, "KQKham", kqkFileName);
                    }

                    //existingBenhNhan.TRANGTHAIKHAM = !string.IsNullOrEmpty(kqxFilePath) ? 2 : (!string.IsNullOrEmpty(kqkFilePath) ? 3 : existingBenhNhan.TRANGTHAIKHAM);
                    if(existingBenhNhan.LiNK_KQXN != null)
                    {
                        existingBenhNhan.TRANGTHAIKHAM = 2;
                    }
                    if(existingBenhNhan.LINK_KQKHAM != null)
                    {
                        existingBenhNhan.TRANGTHAIKHAM = 3;
                    }
                    string BaseURL = "http://14.241.244.112:8080";
                    // Cập nhật trường LINK_KQXN hoặc LINK_KQKHAM tùy theo việc file được đẩy lên folder nào
                    existingBenhNhan.LiNK_KQXN = !string.IsNullOrEmpty(kqxFilePath) ? $"{BaseURL}/KQXN/{kqxFileName}" : existingBenhNhan.LiNK_KQXN;
                    existingBenhNhan.LINK_KQKHAM = !string.IsNullOrEmpty(kqkFilePath) ? $"{BaseURL}/KQKham/{kqkFileName}" : existingBenhNhan.LINK_KQKHAM;

                    // Cập nhật các trường thông tin khác
                    existingBenhNhan.TENBN = benhNhanDTO.TENBN ?? existingBenhNhan.TENBN;
                    existingBenhNhan.GIOITINH = benhNhanDTO.GIOITINH ?? existingBenhNhan.GIOITINH;
                    existingBenhNhan.NGAYSINH = benhNhanDTO.NGAYSINH ?? existingBenhNhan.NGAYSINH;
                    existingBenhNhan.SODIENTHOAI = benhNhanDTO.SODIENTHOAI ?? existingBenhNhan.SODIENTHOAI;
                    existingBenhNhan.GHICHU = benhNhanDTO.GHICHU ?? existingBenhNhan.GHICHU;
                    existingBenhNhan.IDCT = benhNhanDTO.IDCT ?? existingBenhNhan.IDCT;
                    existingBenhNhan.TRANGTHAISMS = benhNhanDTO.TRANGTHAISMS ?? existingBenhNhan.TRANGTHAISMS;
                    existingBenhNhan.NGAYKQ = benhNhanDTO.NGAYKQ ?? existingBenhNhan.NGAYKQ;
                    existingBenhNhan.NGUOIKQ = benhNhanDTO.NGUOIKQ ?? existingBenhNhan.NGUOIKQ;
                    existingBenhNhan.NGAYTAO = benhNhanDTO.NGAYTAO ?? existingBenhNhan.NGAYTAO;
                    existingBenhNhan.NGUOITAO = benhNhanDTO.NGUOITAO ?? existingBenhNhan.NGUOITAO;
                    existingBenhNhan.NGUOIGUISMS = benhNhanDTO.NGUOIGUISMS ?? existingBenhNhan.NGUOIGUISMS;
                    existingBenhNhan.NGAYGUISMS = benhNhanDTO.NGAYGUISMS ?? existingBenhNhan.NGAYGUISMS;
                    

                    await _context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("Không tìm thấy bệnh nhân để cập nhật.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi cập nhật thông tin bệnh nhân: " + ex.Message, ex);
            }
        }




        private async Task<byte[]> ProcessAndSaveBase64(IFormFile file, string folder, string mabn)
        {
            try
            {
                // Định dạng tên file theo yêu cầu
                string fileName = $"{folder}_{mabn}.pdf";

                // Đọc dữ liệu từ IFormFile
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    byte[] fileBytes = memoryStream.ToArray();

                    return fileBytes;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Lỗi khi xử lý và lưu base64: {ex.Message}", ex);
            }
        }


        public async Task<IEnumerable<CongTyBenhNhan>> GetAllAsync()
        {
            var benhNhanList = await _benhNhanCT.GetAllAsync();
            foreach (var benhNhan in benhNhanList)
            {
                benhNhan.TENCT = await _congTyKhamDoan.GetTenCTByIdAsync(benhNhan.IDCT ?? 0);
                benhNhan.TRANGTHAI = await _congTyTrangThai.GetTenTrangThaiByIdAsync(benhNhan.TRANGTHAIKHAM ?? 0);
                benhNhan.TENTRANGTHAISMS = await _congTyTrangThaiSMS.GetTenTrangThaiSMSByIdAsync(benhNhan.TRANGTHAISMS ?? 0);
                benhNhan.MACT = await _congTyKhamDoan.GetMaCTByIdAsync(benhNhan.IDCT ?? 0);

            }
            return benhNhanList;
        }
        public async Task<CongTyBenhNhan> GetBenhNhanByIdAsync(int id)
        {
            var benhNhan = await _benhNhanCT.GetBenhNhanByIdAsync(id);
            if (benhNhan != null)
            {
                benhNhan.TENCT = await _congTyKhamDoan.GetTenCTByIdAsync(benhNhan.IDCT ?? 0);
                benhNhan.TRANGTHAI = await _congTyTrangThai.GetTenTrangThaiByIdAsync(benhNhan.TRANGTHAIKHAM ?? 0);
                benhNhan.TENTRANGTHAISMS = await _congTyTrangThaiSMS.GetTenTrangThaiSMSByIdAsync(benhNhan.TRANGTHAISMS ?? 0);
                benhNhan.MACT = await _congTyKhamDoan.GetMaCTByIdAsync(benhNhan.IDCT ?? 0);
            }
            return benhNhan;
        }

        public async Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanByTenAsync(string ten)
        {
            var benhNhanList = await _benhNhanCT.GetBenhNhanByTenAsync(ten);
            foreach (var benhNhan in benhNhanList)
            {
                benhNhan.TENCT = await _congTyKhamDoan.GetTenCTByIdAsync(benhNhan.IDCT ?? 0);
                benhNhan.TRANGTHAI = await _congTyTrangThai.GetTenTrangThaiByIdAsync(benhNhan.TRANGTHAIKHAM ?? 0);
                benhNhan.TENTRANGTHAISMS = await _congTyTrangThaiSMS.GetTenTrangThaiSMSByIdAsync(benhNhan.TRANGTHAISMS ?? 0);
                benhNhan.MACT = await _congTyKhamDoan.GetMaCTByIdAsync(benhNhan.IDCT ?? 0);
            }
            return benhNhanList;
        }

        public async Task<IEnumerable<CongTyBenhNhan>> GetBenhNhanByMaBNAsync(string maBN)
        {
            var benhNhanList = await _benhNhanCT.GetBenhNhanByMaBNAsync(maBN);
            foreach (var benhNhan in benhNhanList)
            {
                benhNhan.TENCT = await _congTyKhamDoan.GetTenCTByIdAsync(benhNhan.IDCT ?? 0);
                benhNhan.TRANGTHAI = await _congTyTrangThai.GetTenTrangThaiByIdAsync(benhNhan.TRANGTHAIKHAM ?? 0);
                benhNhan.TENTRANGTHAISMS = await _congTyTrangThaiSMS.GetTenTrangThaiSMSByIdAsync(benhNhan.TRANGTHAISMS ?? 0);
                benhNhan.MACT = await _congTyKhamDoan.GetMaCTByIdAsync(benhNhan.IDCT ?? 0);
            }
            return benhNhanList;
        }
        public async Task DeleteBenhNhanAsync(int id)
        {
            try
            {
                var benhNhanDelete = await _benhNhanCT.GetBenhNhanByIdAsync(id);
                if (benhNhanDelete == null)
                {
                    throw new Exception("Bệnh nhân không tồn tại.");
                }

                _context.CongTyBenhNhans.Remove(benhNhanDelete);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting bệnh nhân: " + ex.Message);
            }
        }

        public async Task<string> GetSoDienThoaiByIdAsync(int id)
        {
            return await _benhNhanCT.GetSoDienThoaiByIdAsync(id);
        }

        public async Task<IEnumerable<CongTyBenhNhan>> SearchBenhNhanAsync(string? keyword)
        {
            return await _benhNhanCT.SearchBenhNhanAsync(keyword);
        }


        public class BenhNhanFiles
        {
            public byte[] KQXNFile { get; set; }
            public byte[] KQKhamFile { get; set; }
        }

        public async Task<BenhNhanFiles> DownloadBenhNhanFileAsync(string maBN)
        {
            try
            {
                // Tạo đường dẫn tạm cho cả hai file (KQXN và KQKham)
                string kqxnFilePath = $"KQXN_{maBN}.pdf";
                string kqkhamFilePath = $"KQKham_{maBN}.pdf";

                // Download cả hai file từ FTP hoặc nơi lưu trữ khác
                var kqxnFileTask = _ftpService.DownloadFileAsync(kqxnFilePath);
                var kqkhamFileTask = _ftpService.DownloadFileAsync(kqkhamFilePath);

                // Chờ cả hai file được tải xuống
                await Task.WhenAll(kqxnFileTask, kqkhamFileTask);

                // Trả về cả hai file dưới dạng một đối tượng BenhNhanFiles
                return new BenhNhanFiles
                {
                    KQXNFile = await kqxnFileTask,
                    KQKhamFile = await kqkhamFileTask
                };
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tải file của bệnh nhân: " + ex.Message, ex);
            }
        }



    }
}
