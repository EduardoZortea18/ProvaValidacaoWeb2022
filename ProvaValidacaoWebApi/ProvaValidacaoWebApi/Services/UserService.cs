using ProvaValidacaoWebApi.Data;
using ProvaValidacaoWebApi.Models;
using ProvaValidacaoWebApi.ViewModels;

namespace ProvaValidacaoWebApi.Services
{
  public class UserService
  {
    private readonly DataContext _dataContext;
    public UserService(DataContext context)
    {
      _dataContext = context;
    }

    public User CreateUser(CreateUserViewModel userLogin)
    {
      var user = _dataContext.Users
        .FirstOrDefault(user => user.Nome == userLogin.Nome && user.Senha == userLogin.Senha);

      if (user == null)
      {
        var userNameExists = _dataContext.Users.Any(user => user.Nome == userLogin.Nome);

        return userNameExists ? null : CreateUserToAdd(userLogin);
      }
      
      return user;
    }

    private User CreateUserToAdd(CreateUserViewModel userLogin)
    {
      var newUser = userLogin.FromModel();
      _dataContext.Users.Add(newUser);
      _dataContext.SaveChanges();
      return newUser;
    }
  }
}
