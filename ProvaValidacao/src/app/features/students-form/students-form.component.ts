import { StudentRegister } from './../../models/student-register.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from 'src/app/models/student-interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.less']
})
export class StudentsFormComponent implements OnInit {
  private readonly storage: Storage;

  nome: string = "";
  telefone: string = "";

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly toastrService: ToastrService,
  ) {
    this.ensureAvailableStorage();
    this.storage = window.localStorage;
  }

  ngOnInit(): void {
  }

  save(): void {
    const student: StudentRegister = {
      nome: this.nome,
      telefone: this.telefone
    };

    let storedUserData = this.storage.getItem('token_default');
    let validToken: {token: string, user: {id: number, nome: string, senha: string}} = {
      token: '', user: {id: 0, nome: '', senha: ''}
    };

    if (storedUserData) {
			validToken = JSON.parse(storedUserData) as {token: string, user: {id: number, nome: string, senha: string}};
		}

    this.apiService.post<Student, StudentRegister>('/ProgramacaoWeb2021/aluno', student, storedUserData ? validToken.token : "").subscribe(
      () => {
        this.toastrService.success('', 'Usuário registrado');
        this.router.navigate(["/home"]);
      },
      (response: HttpErrorResponse) => {
        if (response.status === 401){
          this.toastrService.error('', 'Usuário não autorizado');
        }
          this.toastrService.error('', response.message);
      },);
  }

  private ensureAvailableStorage(): void {
		if (!window.localStorage) {
			const message = 'O navegador não suporta armazenamento local de dados.';
			this.toastrService.error('', message);
		}
	}
}
