using Microsoft.EntityFrameworkCore;
using Kontakter.Server.Data;
using Microsoft.AspNetCore.Identity;
using Kontakter.Server.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<KontakterContext>();


builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<KontakterContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("KontakterContextSQLite")));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("https://localhost:49979")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.MapIdentityApi<IdentityUser>();

app.UseDefaultFiles();
app.MapStaticAssets();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<KontakterContext>();
    context.Database.EnsureCreated();
    DbInitializer.Initialize(context);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseHttpsRedirection();

// app.UseAuthorization();
app.UseCors("AllowFrontend");

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
