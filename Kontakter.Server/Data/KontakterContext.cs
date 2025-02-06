using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Kontakter.Server.Models;

namespace Kontakter.Server.Data
{
    /// <summary>
    /// The database context for the website.
    /// </summary>
    public class KontakterContext : IdentityDbContext
    {
        public KontakterContext(DbContextOptions<KontakterContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Contact>().ToTable("Contact");
        }
    }
}