using Kontakter.Server.Data;
using Kontakter.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kontakter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(KontakterContext kontakterContext, ILogger<UserController> logger) : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            // To do: check that user is authenticated and can access their information
            logger.LogInformation($"Fetching user {id}");
            var user = await kontakterContext.Users.FindAsync(id);

            if (user == null)
            {
                logger.LogError($"Fetch failed: user {id} not found");
                return NotFound();
            }
            logger.LogInformation($"User {id} fetched");

            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddUser(User user)
        {
            // To do: hash and salt password before storage
            kontakterContext.Add(user);
            await kontakterContext.SaveChangesAsync();
            logger.LogInformation($"Added new user {user.ID}");
            return CreatedAtAction(nameof(GetUser), new { id = user.ID }, user);
        }
    }
}