using Backend.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ScheduleItem> ScheduleItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Создание индексов для быстрого поиска
            modelBuilder.Entity<ScheduleItem>()
                .HasIndex(s => s.GroupName);

            modelBuilder.Entity<ScheduleItem>()
                .HasIndex(s => s.StartTime);

            modelBuilder.Entity<ScheduleItem>()
                .HasIndex(s => s.Room);

            modelBuilder.Entity<ScheduleItem>()
                .HasIndex(s => s.Teacher);

            // Настройка точности времени
            modelBuilder.Entity<ScheduleItem>()
                .Property(s => s.StartTime)
                .HasPrecision(0); // Точность до секунд

            modelBuilder.Entity<ScheduleItem>()
                .Property(s => s.EndTime)
                .HasPrecision(0);
        }
    }
}
