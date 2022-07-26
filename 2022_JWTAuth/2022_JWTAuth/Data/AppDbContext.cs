using _2022_JWTAuth.Model;
using Microsoft.EntityFrameworkCore;

namespace _2022_JWTAuth.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        }
    }
}
