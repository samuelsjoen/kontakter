using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kontakter.Server.Models
{
    public class Contact
    {  
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public required int UID { get; set; }
        public required string Name { get; set; }
        public required string PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}