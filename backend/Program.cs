using _315HealthCareProject;
using _315HealthCareProject.Data;
using _315HealthCareProject.Repositories;
using _315HealthCareProject.Repositories.Interface;
using _315HealthCareProject.Services;
using _315HealthCareProject.Services.Interface;
using _315HealthCareProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


//cấu hình Oracle EF Core
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseOracle(builder.Configuration.GetConnectionString("OracleDBConnection")));

// Thêm dịch vụ để gửi tin nhắn SMS
builder.Services.AddHttpClient();
builder.Services.AddScoped<ISmsService, SmsService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.Services.AddScoped<ICaLamViecRepository, CaLamViecRepository>();
builder.Services.AddScoped<ICaLamViecService, CaLamViecService>();
builder.Services.AddScoped<IChiNhanhRepository, ChiNhanhRepository>();
builder.Services.AddScoped<IChiNhanhService, ChiNhanhService>();
builder.Services.AddScoped<INguoiDungService, NguoiDungService>();
builder.Services.AddScoped<ITimeComparisonService, TimeComparisonService>();
builder.Services.AddScoped<MenuService>();
builder.Services.AddScoped<INhanVienService, NhanVienService>();
builder.Services.AddScoped<IDangNhapService, DangNhapService>();
builder.Services.AddScoped<INhomNguoiDungService, NhomNguoiDungService>();
builder.Services.AddScoped<IKhoNhapXuatService, KhoNhapXuatService>();
builder.Services.AddScoped<IKhoChiNhanhRepository,  KhoChiNhanhRepository>();
builder.Services.AddScoped<IKhoChiNhanhService, KhoChiNhanhService>();
builder.Services.AddScoped<IDoiTacService , DoiTacService>();
builder.Services.AddScoped<IDoiTacRepository , DoiTacRepository>();
builder.Services.AddScoped<IKhoNhapXuatRepository , KhoNhapXuatRepository>();
builder.Services.AddScoped<IKhoChiNhanhRepository , KhoChiNhanhRepository>();
builder.Services.AddScoped<IKhoChiNhanhService , KhoChiNhanhService>();
builder.Services.AddScoped<IKhoChiTietRepository , KhoChiTietRepository>();
builder.Services.AddScoped<IKhoChiTietService , KhoChiTietService>();
builder.Services.AddScoped<IThuocVatTuRepository , ThuocVatTuRepository>();
builder.Services.AddScoped<IThuocVatTuService , ThuocVatTuService>();
builder.Services.AddScoped<ICongTyKhachKhamDoanRepository , CongTyKhachKhamDoanRepository>();
builder.Services.AddScoped<ICongTyKhachKhamDoanService , CongTyKhachKhamDoanService>();
builder.Services.AddScoped<ICongTyBenhNhanRepository, CongTyBenhNhanRepository>();
builder.Services.AddScoped<ICongTyBenhNhanService , CongTyBenhNhanService>();
builder.Services.AddScoped<ICongTyTrangThaiRepository , CongTyTrangThaiRepository>();
builder.Services.AddScoped<ICongTyTrangThaiService , CongTyTrangThaiService>();



builder.Services.AddCors(p => p.AddPolicy("MyCors", build =>
{
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
var app = builder.Build();

// Định nghĩa một action kiểm tra kết nối database
Action checkDatabaseConnection = () =>
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        try
        {
            dbContext.Database.OpenConnection();
            Console.WriteLine("Đã kết nối đến database");
        }
        catch (Exception)
        {
            Console.WriteLine("Chưa kết nối đến database");
        }
    }
};


app.UseCors("MyCors");
// Gọi action để kiểm tra kết nối khi ứng dụng khởi động
checkDatabaseConnection();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API 315HealthCare");
});
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        context.Response.Redirect("/swagger/index.html");
        return;
    }
    await next();
});
Action sendSmsOnStartup = async () =>
{
    using (var scope = app.Services.CreateScope())
    {
        var smsService = scope.ServiceProvider.GetRequiredService<ISmsService>();
        try
        {
            // Gửi tin nhắn SMS
            await smsService.SendSmsAsync("0904901686", "Nội dung tin nhắn của bạn");
            Console.WriteLine("Đã gửi tin nhắn SMS khi khởi động ứng dụng");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Lỗi khi gửi tin nhắn SMS: {ex.Message}");
        }
    }
};

// Gọi action để gửi tin nhắn SMS khi ứng dụng khởi động
sendSmsOnStartup();


app.UseHttpsRedirection();

app.MapControllers();

app.Run();