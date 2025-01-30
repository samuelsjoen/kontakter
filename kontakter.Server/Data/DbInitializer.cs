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

            context.SaveChanges();

            // var contacts = new Contact[]
            // {
            //     new Contact{UID=1, Name="Dr. Fierce", PhoneNumber="92838849542", Address="Bananveien 13, 2701 Omegn"},
            //     new Contact{UID=1, Name="Nita Peeta", PhoneNumber="29294919443", Address="Grusvei 4, 9819 Kolbotn"},
            //     new Contact{UID=1, Name="Dr. Handsome", PhoneNumber="8092939103", Address="Asfaltvei 1, 9920 Kalfaret"},
            //     new Contact{UID=1, Name="Frida Kahlo", PhoneNumber="2949947628", Address="Skuteviken 91, 0701 Skiby"},
            //     new Contact{UID=1, Name="Edvard Grieg", PhoneNumber="29499910353"},
            //     new Contact{UID=1, Name="Petter Northug", PhoneNumber="9992001203", Address="Epleveien 11, 0201 Bananby"},
            // };

            // context.Contacts.AddRange(contacts);
            // context.SaveChanges();
        }
    }
}