namespace Kontakter.Server
{
    public class Contact
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string PhoneNumber { get; set; }

        public string? Address { get; set; }

    }
}