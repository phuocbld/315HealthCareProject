using _315HealthCareProject;
using _315HealthCareProject.Data;
using _315HealthCareProject.Repositories;
using _315HealthCareProject.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//cấu hình Oracle EF Core
builder.Services.AddDbContext<ApplicationDbContext>(options => 
    options.UseOracle(builder.Configuration.GetConnectionString("OracleDBConnection")));

// Add services to the container.
builder.Services.AddControllers(); // Thêm dòng này để đăng ký các Controllers
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICaLamViecRepository, CaLamViecRepository>();
builder.Services.AddScoped<ICaLamViecService, CaLamViecService>();
builder.Services.AddScoped<IChiNhanhRepository, ChiNhanhRepository>();
builder.Services.AddScoped<IChiNhanhService, ChiNhanhService>();
//builder.Services.AddScoped<IAuthService, AuthService>();
//builder.Services.AddScoped<INguoiDungRepository, NguoiDungRepository>();

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



// Gọi action để kiểm tra kết nối khi ứng dụng khởi động
checkDatabaseConnection();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers(); 

app.Run();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") 
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});