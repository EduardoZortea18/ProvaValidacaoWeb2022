using Microsoft.EntityFrameworkCore;
using ProvaValidacaoWebApi.Models;

namespace ProvaValidacaoWebApi.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options)
            : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Student> Students { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options) =>
      options.UseSqlite("DataSource=app.db;Cache=Shared");

  }
}
