using Kontakter.Server.Data;
using Kontakter.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kontakter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController(KontakterContext kontakterContext, ILogger<ContactsController> logger) : ControllerBase
    {
        [HttpGet(Name = "GetContacts")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts([FromQuery] int UID)
        {
            // To do: check that user is authenticated
            logger.LogInformation($"Fetching contacts for {UID}");
            var contacts = await kontakterContext.Contacts.Where(contact => contact.UID == UID).ToListAsync();
            return contacts;
        }

        [HttpGet(Name ="GetContact")]
        public async Task<ActionResult<Contact>> GetContact([FromQuery] int id)
        {
            logger.LogInformation($"Fetching contact {id}");
            var contact = await kontakterContext.Contacts.FindAsync(id);

            // To do: check that user is authenticated and can access contact information

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> AddContact(Contact contact)
        {
            // To do: check that user is authenticated and can add contact with given UID
            kontakterContext.Add(contact);
            await kontakterContext.SaveChangesAsync();
            logger.LogInformation($"Added new contact {contact.ID}");
            return CreatedAtAction(nameof(GetContact), new { id = contact.ID }, contact);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateContact(int id, Contact contact)
        {
            // To do: check that user is authenticated and can update contact with given UID
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
            logger.LogInformation($"Contact {id} has been updated");
            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteContact(int id) {
            // To do: check that user is authenticated and can delete contact with given UID
            var contact = await kontakterContext.Contacts.FindAsync(id);
            if (contact == null) {
                return NotFound();
            }
            kontakterContext.Remove(contact);
            await kontakterContext.SaveChangesAsync();
            logger.LogInformation($"Contact {id} has been deleted");
            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return kontakterContext.Contacts.Any(e => e.ID == id);
        }
    }
}