import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login, User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string | null = null;
  email = new FormControl('', Validators.required)
  password = new FormControl('', Validators.required)
  showPassword = false;

  constructor(protected service: UserService, protected router: Router, protected cookie: CookieService){}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  login(){
    let self = this
        let login: Login = {
          email : this.email.value ?? "",
          password: this.password.value ?? ""
        }

        this.service.login(login).subscribe({
          next(value: User) {
            // llevarlo a su dashboard.
            localStorage.setItem('access_token', value.access_token)
            self.cookie.set('id',value.id.toString())
            self.router.navigate(['/chats'])
          },
          error(err) {
            console.log(err)
          },
        })
  }




}
