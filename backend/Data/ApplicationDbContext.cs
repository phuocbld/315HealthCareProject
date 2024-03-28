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
    public DbSet<DangNhap> DangNhaps  { get; set; }
    public DbSet<NhomNguoiDung> NhomNguoiDungs { get; set; }
    public DbSet<NhomQuyen> NhomQuyens { get; set; }
    public DbSet<Menu> Menus { get; set; }
    public DbSet<NguoiDungNhomMenu> NGUOIDUNG_MENU_PERMISSION { get; set; }
    public DbSet<ThongTinDangNhap> THONGTINDANGNHAP { get; set; }
    public DbSet<PhuongThucThanhToan> PhuongThucThanhToans { get; set; }
    public DbSet<NhanVien> NhanViens { get; set; }
    public DbSet<KhoNhapXuat> KhoNhapXuats { get; set; }
    public DbSet<Kho> Khos {  get; set; }
    public DbSet<KhoChiNhanh> KhoChiNhanhs { get; set; }
    public DbSet<KhoChiTiet> KhoChiTiets { get; set; }



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
    public IEnumerable<object> dangNhaps { get; internal set; }
    public IEnumerable<object> nhomNguoiDungs { get; internal set; }
    public IEnumerable<object> nhomQuyens { get; internal set; }
    public IEnumerable<object> menus { get; internal set; }
    public IEnumerable<object> caLamViecs { get; internal set; }
    public IEnumerable<object> phuongThucThanhToans { get; internal set; }
    public IEnumerable<object> nhanViens { get; internal set; }
    public IEnumerable<object> khos { get; internal set; }
    public IEnumerable<object> khoChiNhanhs { get; internal set; }
    public IEnumerable<object> khoNhapXuats { get; internal set; }
    public IEnumerable<object> khoChiTiets { get; internal set; }




    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CaLamViec>(entity =>
        {
            entity.ToTable("CALAMVIEC");
            entity.HasKey(e => e.IdCalamViec);
            entity.Property(e => e.IdCalamViec).HasColumnName("IDCALAMVIEC");
            entity.Property(e => e.MaCa).HasColumnName("MACA");
            entity.Property(e => e.TenCa).HasColumnName("TENCA");
            entity.Property(e => e.BatDau).HasColumnName("BATDAU");
            entity.Property(e => e.KetThuc).HasColumnName("KETTHUC");
            entity.Property(e => e.SuDung).HasColumnName("SUDUNG");
            entity.Property(e => e.GhiChu).HasColumnName("GHICHU");
        });
        modelBuilder.Entity<ChiNhanh>(entity =>
        {
            entity.ToTable("CHINHANH");
            entity.HasKey(e => e.IdChiNhanh);
            entity.Property(e => e.IdChiNhanh).HasColumnName("IDCHINHANH");
            entity.Property(e => e.MaChiNhanh).HasColumnName("MACHINHANH");
            entity.Property(e => e.TenChiNhanh).HasColumnName("TENCHINHANH");
           
        });


        modelBuilder.Entity<NguoiDungNhomMenu>().HasNoKey();
        modelBuilder.Entity<ThongTinDangNhap>().HasNoKey();


        modelBuilder.HasSequence<int>("DANGNHAP_SEQ")
      .StartsAt(1)
      .IncrementsBy(1);

        modelBuilder.Entity<DangNhap>()
            .Property(p => p.IdDangNhap)
            .HasDefaultValueSql("DANGNHAP_SEQ.NEXTVAL");




        base.OnModelCreating(modelBuilder);
    }

}
