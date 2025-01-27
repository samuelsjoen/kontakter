using Kontakter.Server.Data;
using Kontakter.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kontakter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController(KontakterContext kontakterContext, ILogger<ContactController> logger) : ControllerBase
    {
        [HttpGet(Name = "GetContacts")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts(int UID)
        {
            // To do: check that user is authenticated and UID belongs to them
            logger.LogInformation($"Fetching contacts for {UID}");
            var contacts = await kontakterContext.Contacts.Where(contact => contact.UID == UID).ToListAsync();
            logger.LogInformation($"Contacts fetched for {UID}");
            return contacts;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            logger.LogInformation($"Fetching contact {id}");
            var contact = await kontakterContext.Contacts.FindAsync(id);

            // To do: check that user is authenticated and can access contact information

            if (contact == null)
            {
                logger.LogError($"Fetch failed: contact {id} not found");
                return NotFound();
            }
            logger.LogInformation($"Contact {id} fetched");

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
        public async Task<ActionResult> UpdateContact(Contact contact)
        {
            // To do: check that user is authenticated and can update contact with given UID
            logger.LogInformation($"Updating contact {contact.ID}");
            kontakterContext.Entry(contact).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            try
            {
                await kontakterContext.SaveChangesAsync();
            }
            catch
            {
                if (!ContactExists(contact.ID))
                {
                    logger.LogError($"Cannot update contact {contact.ID}: contact does not exist");
                    return NotFound();
                } else
                {
                    logger.LogError($"$Cannot update contact {contact.ID}: changes not saved");
                    throw;
                }
            }
            logger.LogInformation($"Contact {contact.ID} has been updated");
            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteContact(int id) {
            // To do: check that user is authenticated and can delete contact with given UID
            logger.LogWarning($"Deleting contact {id}");
            var contact = await kontakterContext.Contacts.FindAsync(id);
            if (contact == null) {
                logger.LogError($"Deleting contact {id} failed: no such contact found");
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