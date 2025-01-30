using Xunit;
using Kontakter.Server.Data;
using Kontakter.Server.Models;
using Microsoft.EntityFrameworkCore;

public class ContactServiceTests
{
    private static KontakterContext? context;
    private static Contact? contact;

    private KontakterContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<KontakterContext>()
            .UseInMemoryDatabase(databaseName: "KontakterTestDb")
            .Options;
        return new KontakterContext(options);
    }

    private async Task InitializeSetup()
    {
        context = GetInMemoryDbContext();
        contact = new Contact { Name = "Peter Pan", PhoneNumber = "123456789", Address = "Gate 123", UID = "123" };
        context.Contacts.Add(contact);
        await context.SaveChangesAsync();
    }

    [Fact]
    public async Task AddContact()
    {
        await InitializeSetup();
        var savedContact = await context.Contacts.FindAsync(contact.ID);
        Assert.NotNull(savedContact);
        Assert.Equal("Peter Pan", savedContact.Name);
        Assert.Equal("123456789", savedContact.PhoneNumber);
        Assert.Equal("Gate 123", savedContact.Address);
        Assert.Equal("123", savedContact.UID);
    }

    [Fact]
    public async Task AddAddresslessContact()
    {
        context = GetInMemoryDbContext();
        contact = new Contact { Name = "Peter Pan", PhoneNumber = "123456789", UID = "123" };
        context.Contacts.Add(contact);
        await context.SaveChangesAsync();
        var savedContact = await context.Contacts.FindAsync(contact.ID);
        Assert.NotNull(savedContact);
        Assert.Equal("Peter Pan", savedContact.Name);
        Assert.Equal("123456789", savedContact.PhoneNumber);
        Assert.Null(savedContact.Address);
        Assert.Equal("123", savedContact.UID);
    }

    [Fact]
    public async Task RemoveContact()
    {
        await InitializeSetup();
        var savedContact = await context.Contacts.FindAsync(contact.ID);
        Assert.NotNull(savedContact);
        context.Remove(savedContact);
        await context.SaveChangesAsync();
        savedContact = await context.Contacts.FindAsync(contact.ID);
        Assert.Null(savedContact);
    }

    [Fact]
    public async Task UpdateContact()
    {
        await InitializeSetup();
        var savedContact = await context.Contacts.FindAsync(contact.ID);
        {
            savedContact.Name = "Nytt Navn";
            savedContact.PhoneNumber = "New phone who dis";
            savedContact.Address = "Ny Gate 123";
            savedContact.UID = "321";
        }
        context.Entry(contact).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        await context.SaveChangesAsync();
        savedContact = await context.Contacts.FindAsync(contact.ID);
        Assert.NotNull(savedContact);
        Assert.Equal("Nytt Navn", savedContact.Name);
        Assert.Equal("New phone who dis", savedContact.PhoneNumber);
        Assert.Equal("Ny Gate 123", savedContact.Address);
        Assert.Equal("321", savedContact.UID);
    }

    [Fact]
    public async Task GetContacts()
    {
        await InitializeSetup();
        var contact2 = new Contact { Name = "Peter Pan", PhoneNumber = "123456789", UID = "123" };
        context.Contacts.Add(contact2);
        await context.SaveChangesAsync();
        var contacts = await context.Contacts.Where(contact => contact.UID == "123").ToListAsync();
        Assert.Contains(contact, contacts);
        Assert.Contains(contact2, contacts);
    }
}