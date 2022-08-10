import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from 'src/app/models/user-login.interface';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/apiService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  private readonly storage: Storage;

  nome: string = "";
  senha: string = "";

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly toastrService: ToastrService
  ) {
		this.ensureAvailableStorage();
    this.storage = window.localStorage;
  }

  ngOnInit(): void {
  }

  login(): void {
    const userToLogin: UserLogin = { nome: this.nome, senha: this.senha };

    this.apiService.postLogin<User, UserLogin>('/ProgramacaoWeb2021/login', userToLogin).subscribe(
      (user: User) => {
        this.router.navigate(["/home"]);
        this.storage.setItem('token_default', JSON.stringify(user))
        this.toastrService.success('Sucesso', 'Usuario logado');
      },
      (response: HttpErrorResponse) => {
        this.toastrService.error('Erro', 'Usuario invalido');
      },);
  }

  private ensureAvailableStorage(): void {
		if (!window.localStorage) {
			const message = 'O navegador não suporta armazenamento local de dados.';
			this.toastrService.error('', message);
		}
	}
}
