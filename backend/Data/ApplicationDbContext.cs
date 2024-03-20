namespace _315HealthCareProject.Data;

using Microsoft.EntityFrameworkCore;
using _315HealthCareProject.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<CaLamViec> CaLamViecs { get; set; }
    public DbSet<ChiNhanh> ChiNhanhs { get; set; }
    public DbSet<TinhTP> TinhTps { get; set; }
    public DbSet<NguoiDung> NguoiDungs { get; set; }
    public DbSet<QuanHuyen> QuanHuyens { get; set; }
    public DbSet<PhuongXa> PhuongXas { get; set; }
    public DbSet<DanToc> DanTocs { get; set; }
    public DbSet<QuocTich> QuocTichs { get; set; }
    public DbSet<DoiTuong> DoiTuongs { get; set; }
    public DbSet<NgheNghiep> NgheNghieps { get; set; }
    public DbSet<NguonKhachHang> NguonKHs { get; set; }
    public DbSet<HinhThucThanhToan> HinhThucs { get; set; }
    public DbSet<PhongKham> PhongKhams { get; set; }

    public IEnumerable<object> Chinhanhs { get; internal set; }
    public IEnumerable<object> Tinhs { get; internal set; }
    public IEnumerable<object> Quans { get; internal set; }
    public IEnumerable<object> Phuongs { get; internal set; }
    public IEnumerable<object> danTocs { get; internal set; }
    public IEnumerable<object> quocTichs { get; internal set; }
    public IEnumerable<object> doiTuongs { get; internal set; }
    public IEnumerable<object> ngheNghieps { get; internal set; }
    public IEnumerable<object> nguonKHs { get; internal set; }
    public IEnumerable<object> hinhThucs { get; internal set; }
    public IEnumerable<object> phongKhams { get; internal set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Sử dụng Fluent API để ánh xạ tên cột in hoa cho mỗi thuộc tính
        modelBuilder.Entity<CaLamViec>(entity =>
        {
            entity.HasKey(e => e.IdCalaMviec); // Giả sử đây là khóa chính
            entity.Property(e => e.IdCalaMviec).HasColumnName("IDCALAMVIEC");
            entity.Property(e => e.MaCa).HasColumnName("MACA");
            entity.Property(e => e.TenCa).HasColumnName("TENCA");
            entity.Property(e => e.BatDau).HasColumnName("BATDAU");
            entity.Property(e => e.KetThuc).HasColumnName("KETTHUC");
            entity.Property(e => e.SuDung).HasColumnName("SUDUNG");
            entity.Property(e => e.GhiChu).HasColumnName("GHICHU");
        });

        // Cấu hình ánh xạ cho lớp ChiNhanh
        modelBuilder.Entity<ChiNhanh>(entity =>
        {
            entity.ToTable("CHINHANH"); // Xác định tên bảng
            entity.HasKey(e => e.IdChiNhanh); // Xác định khóa chính
            // Ánh xạ các thuộc tính của ChiNhanh với các cột tương ứng trong bảng CHINHANH
            entity.Property(e => e.IdChiNhanh).HasColumnName("IDCHINHANH");
            entity.Property(e => e.MaChiNhanh).HasColumnName("MACHINHANH");
            entity.Property(e => e.TenChiNhanh).HasColumnName("TENCHINHANH");
           
        });


        base.OnModelCreating(modelBuilder);
    }




}
