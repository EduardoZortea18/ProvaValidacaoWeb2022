import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student-interface';
import { ApiService } from 'src/app/services/apiService.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.less']
})
export class StudentsListComponent implements OnInit {

  students$ = this.apiService.get<Student[]>('/ProgramacaoWeb2021/aluno');

  constructor(private readonly apiService : ApiService) { }

  ngOnInit(): void {
  }

}
