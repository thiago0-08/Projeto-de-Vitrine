using Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Vitrine.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<ProdutoService>();
builder.Services.AddScoped<CategoriaService>();
builder.Services.AddScoped<CarrosselService>();
builder.Services.AddScoped<LancamentoService>();



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
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));







builder.Services.AddControllers();


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("permitirTudo");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
