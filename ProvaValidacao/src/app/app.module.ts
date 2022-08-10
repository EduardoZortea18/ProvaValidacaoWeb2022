import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './features/navbar/navbar.component';
import { StudentsListComponent } from './features/students-list/students-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { StudentsFormComponent } from './features/students-form/students-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './features/login/login.component';
import { ApiService } from './services/apiService.service';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentsListComponent },
  { path: 'register-student', component: StudentsFormComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentsListComponent,
    HomeComponent,
    StudentsFormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
		BrowserAnimationsModule,
    HttpClientModule,
    NzNotificationModule,
    ToastrModule.forRoot({
      timeOut: 100000, // 10 seconds
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
