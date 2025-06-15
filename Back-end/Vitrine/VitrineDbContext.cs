using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using Vitrine.Model;

namespace Database;

public partial class VitrineDbContext : DbContext
{
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }

    public VitrineDbContext()
    {
    }

    public VitrineDbContext(DbContextOptions<VitrineDbContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Database=vitrine;Username=postgres;Password=1234");
        }
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        OnModelCreatingPartial(modelBuilder);
    }


    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
