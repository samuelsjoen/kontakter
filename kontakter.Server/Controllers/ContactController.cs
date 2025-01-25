using Kontakter.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kontakter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController(ILogger<ContactsController> logger) : ControllerBase
    {
        [HttpGet(Name = "GetContacts")]
        public IEnumerable<Contact> GetContacts()
        {
            logger.LogInformation("Fetching contacts");
            throw new NotImplementedException();
        }
    }
}