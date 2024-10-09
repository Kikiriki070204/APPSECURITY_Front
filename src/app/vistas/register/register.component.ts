import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router} from '@angular/router';
import { Register, User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string | null = null
  username = new FormControl('',Validators.required)
  email = new FormControl('', Validators.required)
  password = new FormControl('', Validators.minLength(6))

  constructor(protected service: UserService, protected router: Router){}

  registrar(){
    let self = this
    let register: Register = {
      username : this.username.value ?? "",
      email: this.email.value ?? "",
      password: this.password.value ?? ""
    }
    if (this.username.invalid || this.email.invalid || this.password.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }
   
    this.service.register(register).subscribe({
      next(value: User ) {
        // llevarlo a login.
        console.log(value.username)
        self.router.navigate(['/verify'])
      },
      error(err) {
        console.log(err)
      },
    })
  }
}
