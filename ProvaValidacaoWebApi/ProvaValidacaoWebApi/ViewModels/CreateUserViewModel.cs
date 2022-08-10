using Flunt.Notifications;
using Flunt.Validations;
using ProvaValidacaoWebApi.Models;

namespace ProvaValidacaoWebApi.ViewModels
{
  public class CreateUserViewModel : Notifiable<Notification>
  {
    public string Nome { get; set; }

    public string Senha { get; set; }

    public User FromModel()
    {
      AddNotifications(new Contract<Notification>()
        .Requires()
        .IsNotNull(Nome, "Informe o nome do aluno")
        .IsNotNull(Senha, "Informe a senha do aluno"));

      return new User() { Nome = Nome, Senha = Senha };
    }
  }
}
