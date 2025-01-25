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

            var users = new User[]
            {
                new User{Username="Test", Password="hallo"}
            };

            context.Users.AddRange(users);
            context.SaveChanges();

            var contacts = new Contact[]
            {
                new Contact{UID=1, FirstName="Dr.", LastName="Fierce", PhoneNumber="92838849542", Address="Bananveien 13, 2701 Omegn"},
                new Contact{UID=1, FirstName="Nita", LastName="Peeta", PhoneNumber="29294919443", Address="Grusvei 4, 9819 Kolbotn"},
                new Contact{UID=1, FirstName="Dr.", LastName="Handsome", PhoneNumber="8092939103", Address="Asfaltvei 1, 9920 Kalfaret"},
                new Contact{UID=1, FirstName="Frida", LastName="Kahlo", PhoneNumber="2949947628", Address="Skuteviken 91, 0701 Skiby"},
                new Contact{UID=1, FirstName="Edvard", LastName="Munch", PhoneNumber="29499910353"},
                new Contact{UID=1, FirstName="Petter", LastName="Northug", PhoneNumber="9992001203", Address="Epleveien 11, 0201 Bananby"},
            };

            context.Contacts.AddRange(contacts);
            context.SaveChanges();
        }
    }
}