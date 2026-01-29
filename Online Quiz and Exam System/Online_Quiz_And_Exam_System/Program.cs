using Online_Quiz_And_Exam_System.DAL;
using Online_Quiz_API.DAL;

namespace Online_Quiz_And_Exam_System
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            builder.Services.AddCors(o =>
                o.AddPolicy("react", p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod())
            );

            builder.Services.AddSingleton<DbConnection>();
            builder.Services.AddScoped<UserDAL>();
            builder.Services.AddScoped<ModuleDAL>();
            builder.Services.AddScoped<QuestionDAL>();
            builder.Services.AddScoped<ResultDAL>();
            builder.Services.AddScoped<MockDAL>();


            var app = builder.Build();

            app.UseRouting();
            app.UseCors("react");
            app.MapControllers();
            app.Run();

        }
    }
}
