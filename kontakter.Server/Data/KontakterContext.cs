using Microsoft.EntityFrameworkCore;
using Kontakter.Server.Models;

namespace Kontakter.Server.Data
{
    public class KontakterContext : DbContext
    {
        public KontakterContext (DbContextOptions<KontakterContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().ToTable("Contact");
        }
    }
}