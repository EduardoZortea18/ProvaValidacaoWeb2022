using Flunt.Notifications;
using Flunt.Validations;
using ProvaValidacaoWebApi.Models;

namespace ProvaValidacaoWebApi.ViewModels
{
  public class CreateStudentViewModel : Notifiable<Notification>
  {
    public string Nome { get; set; }
    public string Telefone { get; set; }
    public int Idade { get; set; }

    public Student FromModel()
    {
      AddNotifications(new Contract<Notification>()
        .Requires()
        .IsNotNull(Nome, "Informe o nome do aluno")
        .IsNotNull(Telefone, "Informe o telefone do aluno")
        .IsGreaterThan(Idade, 0, "Informe a idade do aluno")
        .IsLowerThan(Telefone, 25, "Tamanho de telefone invalido"));

      return new Student() { Idade = Idade, Nome = Nome, Telefone = Telefone };
    }
  }
}
