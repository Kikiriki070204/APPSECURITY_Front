import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { Observable } from 'rxjs';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

 
  return new Observable<boolean>(observe => {  
    authService.me().subscribe({
      next(value) {
        observe.next(true)
      },
      error(err) {
        router.navigate(['/login'])
        console.log("going back to login")
      },
    })
  })

  return true; 
};
