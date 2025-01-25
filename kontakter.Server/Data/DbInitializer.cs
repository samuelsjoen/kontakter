using Kontakter.Server.Models;
using Kontakter.Server.Data;

namespace Kontakter.Server.Data
{
    public static class DbInitializer
    {
        public static void Initialize(KontakterContext context)
        {
            if (context.Contacts.Any())
            {
                return;
            }

            var contacts = new Contact[]
            {
                new Contact{FirstName="Dr.", LastName="Fierce", PhoneNumber="92838849542", Address="Bananveien 13, 2701 Omegn"},
                new Contact{FirstName="Nita", LastName="Peeta", PhoneNumber="29294919443"},
                new Contact{FirstName="Dr.", LastName="Handsome", PhoneNumber="8092939103"},
                new Contact{FirstName="Frida", LastName="Kahlo", PhoneNumber="2949947628"},
                new Contact{FirstName="Edvard", LastName="Munch", PhoneNumber="29499910353"},
                new Contact{FirstName="Petter", LastName="Northug", PhoneNumber="9992001203"},
            };

            context.Contacts.AddRange(contacts);
            context.SaveChanges();
        }
    }
}