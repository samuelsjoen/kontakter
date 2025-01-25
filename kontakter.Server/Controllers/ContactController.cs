using Kontakter.Server.Data;
using Kontakter.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kontakter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController(KontakterContext kontakterContext, ILogger<ContactsController> logger) : ControllerBase
    {
        [HttpGet(Name = "GetContacts")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            logger.LogInformation("Fetching contacts");
            throw new NotImplementedException();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            logger.LogInformation("Fetching contact " + id);
            var contact = await kontakterContext.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> AddContact(Contact contact)
        {
            kontakterContext.Add(contact);
            await kontakterContext.SaveChangesAsync();
            logger.LogInformation("Added new contact " + contact.ID);
            return CreatedAtAction(nameof(GetContact), new { id = contact.ID }, contact);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateContact(int id, Contact contact)
        {
            if (id != contact.ID)
            {
                return BadRequest();
            }
            kontakterContext.Entry(contact).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            try
            {
                await kontakterContext.SaveChangesAsync();
            }
            catch
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                } else
                {
                    throw;
                }
            }
            logger.LogInformation("Contact " + id + " has been updated");
            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteContact(int id) {
            var contact = await kontakterContext.Contacts.FindAsync(id);
            if (contact == null) {
                return NotFound();
            }
            kontakterContext.Remove(contact);
            await kontakterContext.SaveChangesAsync();
            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return kontakterContext.Contacts.Any(e => e.ID == id);
        }
    }
}