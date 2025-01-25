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
                new Contact{ID=1,FirstName="Dr.", LastName="Fierce", PhoneNumber="92838849542"},
                new Contact{ID=2,FirstName="Nita", LastName="Peeta", PhoneNumber="29294919443"},
                new Contact{ID=3,FirstName="Dr.", LastName="Handsome", PhoneNumber="8092939103"},
                new Contact{ID=4,FirstName="Frida", LastName="Kahlo", PhoneNumber="2949947628"},
                new Contact{ID=5,FirstName="Edvard", LastName="Munch", PhoneNumber="29499910353"},
                new Contact{ID=6,FirstName="Petter", LastName="Northug", PhoneNumber="9992001203"},
            };

            context.Contacts.AddRange(contacts);
            context.SaveChanges();
        }
    }
}