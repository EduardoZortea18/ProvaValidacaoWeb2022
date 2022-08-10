namespace ProvaValidacaoWebApi.Models
{
  public class StudentResponse
  {
    public int IdAluno { get; set; }
    public string Nome { get; set; }
    public string Telefone { get; set; }

    public static StudentResponse FromStudent(Student student) => new StudentResponse
    {
      IdAluno = student.Id,
      Nome = student.Nome,
      Telefone = student.Telefone,
    };
  }
}
