using Microsoft.AspNetCore.Mvc;

namespace Kontakter.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
       [HttpGet(Name = "GetContacts")]
       public IEnumerable<Contact> Get() {
        
       } 
    }
}