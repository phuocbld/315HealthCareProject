﻿using _315HealthCareProject.Data;
using _315HealthCareProject.Models;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _315HealthCareProject.Services
{
    public class CongTyBenhNhanService : ICongTyBenhNhanService
    {
        private readonly ICongTyBenhNhanRepository _benhNhanCT;
        private readonly ApplicationDbContext _context;
        private readonly ICongTyTrangThaiRepository _congTyTrangThai;
        private readonly ICongTyKhachKhamDoanRepository _congTyKhamDoan;
        private readonly ICongTyTrangThaiSMSRepository _congTyTrangThaiSMS;

        public CongTyBenhNhanService(ICongTyBenhNhanRepository repository, ApplicationDbContext context, 
            ICongTyTrangThaiRepository congTyTrangThai , ICongTyKhachKhamDoanRepository congTyKhamDoan , ICongTyTrangThaiSMSRepository congTyTrangThaiSMS)
        {
            _benhNhanCT = repository;
            _context = context;
            _congTyTrangThai = congTyTrangThai;
            _congTyKhamDoan = congTyKhamDoan;
            _congTyTrangThaiSMS = congTyTrangThaiSMS;
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




        public async Task UpdateBenhNhanAsync(CongTyBenhNhan benhNhan)
        {
            try
            {
                // Cập nhật thông tin bệnh nhân
                _context.Entry(benhNhan).State = EntityState.Modified;

                // Kiểm tra và cập nhật trạng thái TrangThaiKham
                if (benhNhan.KQXN != null)
                {
                    benhNhan.TRANGTHAIKHAM = 2; // Nếu có KQXN thì TrangThaiKham là 2
                }
                else if (benhNhan.KQKHAM != null)
                {
                    benhNhan.TRANGTHAIKHAM = 3; // Nếu có KQKHAM thì TrangThaiKham là 3
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating bệnh nhân: " + ex.Message);
            }
        }


        //public async Task UpdateBenhNhanAsync(CongTyBenhNhan benhNhan, byte[] pdfFile, string fieldToUpdate)
        //{
        //    try
        //    {
        //        // Cập nhật thông tin bệnh nhân
        //        _context.Entry(benhNhan).State = EntityState.Modified;

        //        // Kiểm tra và cập nhật file PDF nếu có
        //        if (pdfFile != null && pdfFile.Length > 0)
        //        {
        //            if (fieldToUpdate == "KQXN")
        //            {
        //                benhNhan.KQXN = pdfFile;
        //            }
        //            else if (fieldToUpdate == "KQKHAM")
        //            {
        //                benhNhan.KQKHAM = pdfFile;
        //            }
        //        }

        //        // Kiểm tra và cập nhật trạng thái TrangThaiKham
        //        if (benhNhan.KQXN != null)
        //        {
        //            benhNhan.TRANGTHAIKHAM = 2; // Nếu có KQXN thì TrangThaiKham là 2
        //        }
        //        else if (benhNhan.KQKHAM != null)
        //        {
        //            benhNhan.TRANGTHAIKHAM = 3; // Nếu có KQKHAM thì TrangThaiKham là 3
        //        }

        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("An error occurred while updating bệnh nhân: " + ex.Message);
        //    }
        //}

        //public async Task UpdateBenhNhanAsync(CongTyBenhNhan benhNhan, byte[]? pdfFile)
        //{
        //    try
        //    {
        //        // Cập nhật thông tin bệnh nhân
        //        _context.Entry(benhNhan).State = EntityState.Modified;

        //        // Kiểm tra và cập nhật file PDF nếu có
        //        if (pdfFile != null && pdfFile.Length > 0)
        //        {
        //            // Lưu trữ file PDF vào trường KQXN hoặc KQKham
        //            // Ở đây tôi giả sử bạn muốn lưu vào trường KQXN
        //            benhNhan.KQXN = pdfFile;
        //        }

        //        // Kiểm tra và cập nhật trạng thái TrangThaiKham
        //        if (benhNhan.KQXN != null)
        //        {
        //            benhNhan.TRANGTHAIKHAM = 2; // Nếu có KQXN thì TrangThaiKham là 2
        //        }
        //        else if (benhNhan.KQKHAM != null)
        //        {
        //            benhNhan.TRANGTHAIKHAM = 3; // Nếu có KQKHAM thì TrangThaiKham là 3
        //        }

        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("An error occurred while updating bệnh nhân: " + ex.Message);
        //    }
        //}



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




    }
}
