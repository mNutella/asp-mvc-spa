using Microsoft.EntityFrameworkCore;
using AspNetSpa.Models;

namespace AspNetSpa.Data
{
  public class AspNetSpaContex : DbContext
  {
    public DbSet<Company> Companies { get; set; }
    public DbSet<Invoice> Invoices { get; set; }

    public AspNetSpaContex(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
  }
}