namespace Kontakter.Server.Models
{
    public class Contact
    {  
        public required int ID { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}