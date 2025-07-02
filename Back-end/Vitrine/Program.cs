using Database;
using Microsoft.EntityFrameworkCore;
using Vitrine.Endpoints;

namespace Vitrine
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("permitirTudo", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<VitrineDbContext>(options =>
                 options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
             );


            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.RegistrarEndpointsLancamento();
            app.UseCors("permitirTudo");

            app.RegistrarEndpointsProduto();
            app.RegistrarEndpointsCategoria();

            app.Run();
        }
    }
}
