using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly SignInManager<IdentityUser> signInManager;
    private readonly UserManager<IdentityUser> userManager;

    public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
    }

[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginModel model)
{
    var user = await userManager.FindByEmailAsync(model.Email); // Use Email instead of Username
    if (user == null || !(await userManager.CheckPasswordAsync(user, model.Password)))
    {
        return Unauthorized(new { message = "Invalid credentials" });
    }

    var result = await signInManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: false);
    if (!result.Succeeded)
    {
        return Unauthorized(new { message = "Invalid credentials" });
    }

    return Ok(new { message = "Login successful" });
}


    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return Ok(new { message = "Logged out" });
    }

    [HttpGet("check-auth")]
    public IActionResult CheckAuth()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return Ok(new { isAuthenticated = true });
        }
        return Unauthorized(new { isAuthenticated = false });
    }
}

public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}
