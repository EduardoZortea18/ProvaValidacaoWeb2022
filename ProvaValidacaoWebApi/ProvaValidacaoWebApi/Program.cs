using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ProvaValidacaoWebApi;
using ProvaValidacaoWebApi.Data;
using ProvaValidacaoWebApi.Models;
using ProvaValidacaoWebApi.Services;
using ProvaValidacaoWebApi.ViewModels;
using System.Text;

var MyAllowSpecificOrigins = "_myCors";

var builder = WebApplication.CreateBuilder(args);

var key = Encoding.ASCII.GetBytes(Settings.Secret);

builder.Services.AddAuthentication(x =>
{
  x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
  x.RequireHttpsMetadata = false;
  x.SaveToken = true;
  x.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(key),
    ValidateIssuer = false,
    ValidateAudience = false,
  };
});

builder.Services.AddDbContext<DataContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
                    policy =>
                    {
                      policy.AllowAnyOrigin();
                      policy.AllowAnyHeader();
                      policy.AllowAnyMethod();
                    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/students", (DataContext context) =>
{
  var students = context.Students.Select(student => StudentResponse.FromStudent(student)).ToList();

  return Results.Ok(students);
}).Produces<List<Student>>();

app.MapPost("/students",
  (CreateStudentViewModel viewModel, DataContext context) =>
{
  var student = viewModel.FromModel();

  if (!viewModel.IsValid)
    return Results.BadRequest(viewModel.Notifications);

  context.Students.Add(student);
  context.SaveChanges();

  return Results.Created("", student);
}).Produces<Student>().ProducesProblem(400).RequireAuthorization();

app.MapPost("/login", (CreateUserViewModel userLogin, DataContext context) =>
{
  var user = new UserService(context).CreateUser(userLogin);

  if (user == null)
  {
    return Results.BadRequest(new
    {
      message = "Usuário invalido"
    });
  }

  var token = TokenService.GenerateToken(user);
  user.Senha = "";

  return Results.Ok(new { user = user, token = token });
});

app.Run();
