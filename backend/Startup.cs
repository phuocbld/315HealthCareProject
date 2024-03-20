

//namespace _315HealthCareProject
//{
//    public class Startup
//    {

//        public void Configure(IApplicationBuilder app , IWebHostEnvironment env)
//        {
//            // Thêm middleware CORS
//            app.UseCors(options =>
//            {
//                options.AllowAnyOrigin()
//                       .AllowAnyMethod()
//                       .AllowAnyHeader();
//            });

//            // Các middleware khác
//            app.UseHttpsRedirection();
//            app.UseRouting();
//            app.UseAuthentication();
//            app.UseAuthorization();

//            // Cấu hình Endpoint
//            app.UseEndpoints(endpoints =>
//            {
//                endpoints.MapControllers();
//            });
//        }

//    }
//}