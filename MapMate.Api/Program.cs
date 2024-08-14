var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSpaStaticFiles(opt =>
{
    opt.RootPath = "MapMate-frontend/browser";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseSpaStaticFiles();

app.UseSpa(config =>
{
    config.Options.DefaultPageStaticFileOptions = new StaticFileOptions
    {
        /* This call sets just the index.html to never be cached, as
         * if this is cached, it will interfere with cookie timeout & token refresh
         * This callback is only triggered when not using the Angular CLI server.
         */
        OnPrepareResponse = (ctx) =>
        {
            var headers = ctx.Context.Response.GetTypedHeaders();
            headers.CacheControl = new Microsoft.Net.Http.Headers.CacheControlHeaderValue
            {
                NoCache = true,
                NoStore = true,
                MustRevalidate = true,
            };
        },
    };

    // Provide override for disabling proxy in development
    // Primarily used for Container App running in Development
    var shouldDisableProxying = app.Configuration.GetValue<bool?>("AngularCLI:DisableProxying") ?? false;
    if ((app.Environment.IsDevelopment() || app.Environment.IsEnvironment("Local")) && !shouldDisableProxying)
    {
        config.UseProxyToSpaDevelopmentServer("http://localhost:4200");
    }
});

app.Run();
