import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login, User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string | null = null;
  email = new FormControl('', Validators.required)
  password = new FormControl('', Validators.required)

  constructor(protected service: UserService, protected router: Router){}

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
            self.router.navigate(['/chats'])
          },
          error(err) {
            console.log(err)
          },
        })
  }
    

    
  
}
