import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  private readonly storage: Storage;

  constructor(
    private readonly toastrService: ToastrService,
    private readonly router: Router) {
    this.ensureAvailableStorage();
    this.storage = window.localStorage;
  }

  ngOnInit(): void {
  }

  verifyPermission(): void {
    let storedUserData = this.storage.getItem('token_default');
    let validToken: { token: string, user: { id: number, nome: string, senha: string } } = {
      token: '', user: { id: 0, nome: '', senha: '' }
    };

    console.log(storedUserData);


    if (storedUserData) {
      validToken = JSON.parse(storedUserData) as { token: string, user: { id: number, nome: string, senha: string } };
    }

    console.log(validToken);

    if (!storedUserData || !validToken.token) {
      this.toastrService.error('', 'Usuário não autorizado');
    } else {
      this.router.navigate(["/register-student"]);
    }
  }

  private ensureAvailableStorage(): void {
    if (!window.localStorage) {
      const message = 'O navegador não suporta armazenamento local de dados.';
      this.toastrService.error('', message);
    }
  }
}
