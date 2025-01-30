using Kontakter.Server.Data;
using Kontakter.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kontakter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController(KontakterContext KontakterContext, ILogger<ContactController> logger) : ControllerBase
    {
        [HttpGet(Name = "GetContacts")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            var UID = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (UID == null)
            {
                logger.LogError("User ID not found");
                return Unauthorized();
            }
            logger.LogInformation($"Fetching contacts for {UID}");
            var contacts = await KontakterContext.Contacts.Where(contact => contact.UID == UID).ToListAsync();
            logger.LogInformation($"Contacts fetched for {UID}");
            return contacts;
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<Contact>> GetContact(int id)
        // {
        //     var UID = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        //     logger.LogInformation($"Fetching contact {id}");
        //     var contact = await KontakterContext.Contacts.FindAsync(id);

        //     if (contact == null)
        //     {
        //         logger.LogError($"Fetch failed: contact {id} not found");
        //         return NotFound();
        //     }
        //     if (contact.UID != UID)
        //     {
        //         logger.LogWarning($"User {UID} attempted to fetch contact {contact.UID} which does not belong to them");
        //         return NotFound();
        //     }
        //     logger.LogInformation($"Contact {id} fetched");
        //     return contact;
        // }

        [HttpPost]
        public async Task<ActionResult> AddContact(CreateContactDto contactDto)
        {
            logger.LogInformation("User sent create contact request");
            var UID = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (UID == null)
            {
                logger.LogError("User ID not found");
                return Unauthorized();
            }
            var contact = new Contact
            {
                Name = contactDto.Name,
                PhoneNumber = contactDto.PhoneNumber,
                Address = contactDto.Address,
                UID = UID
            };
            KontakterContext.Add(contact);
            await KontakterContext.SaveChangesAsync();
            logger.LogInformation($"Added new contact {contact.ID}");
            return Ok(null);
        }
        [HttpPut]
        public async Task<ActionResult> UpdateContact(Contact contact)
        {
            var UID = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            logger.LogInformation($"Updating contact {contact.ID}");
            if (!ContactExists(contact.ID))
            {
                logger.LogError($"Cannot update contact {contact.ID}: contact does not exist");
                return NotFound();
            }
            if (contact.UID != UID)
            {
                logger.LogWarning($"User {UID} attempted to update contact {contact.UID} which does not belong to them");
                return Unauthorized();
            }
            KontakterContext.Entry(contact).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            try
            {
                await KontakterContext.SaveChangesAsync();
                logger.LogInformation($"Contact {contact.ID} has been updated");
                return Ok(null);
            }
            catch (Exception ex)
            {
                logger.LogError($"An error occurred while updating contact {contact.ID}: {ex.Message}");
                return StatusCode(500, "An unexpected error occurred while updating the contact.");
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteContact(int id)
        {
            var UID = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (UID == null)
            {
                logger.LogError("User ID not found");
                return Unauthorized();
            }
            logger.LogWarning($"Deleting contact {id}");
            var contact = await KontakterContext.Contacts.FindAsync(id);
            if (contact == null)
            {
                logger.LogError($"Deleting contact {id} failed: no such contact found");
                return NotFound();
            }
            if (contact.UID != UID)
            {
                logger.LogWarning($"User {UID} attempted to delete contact {contact.UID} which does not belong to them");
                return Unauthorized();
            }
            KontakterContext.Remove(contact);
            await KontakterContext.SaveChangesAsync();
            logger.LogInformation($"Contact {id} has been deleted");
            return Ok(null);
        }

        private bool ContactExists(int id)
        {
            return KontakterContext.Contacts.Any(e => e.ID == id);
        }
    }

    public class CreateContactDto
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
    }
}