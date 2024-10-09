import { Routes } from '@angular/router';
import { IndexComponent } from './vistas/index/index.component';
import { RegisterComponent } from './vistas/register/register.component';
import { LoginComponent } from './vistas/login/login.component';
import { ChatsComponent } from './vistas/chats/chats.component';
import { MessageComponent } from './vistas/message/message.component';
import { authenticateGuard } from './guards/authenticate.guard';

export const routes: Routes = [
    
        {path: '',loadComponent: () => import('./vistas/index/index.component').then(m=>m.IndexComponent)},
        {path: 'register',
                loadComponent: () => import('./vistas/register/register.component').then(m=>m.RegisterComponent)
        },
        {path: 'verify', 
                loadComponent: () => import('./vistas/verify/verify.component').then(m=>m.VerifyComponent)
        },
        {path: 'login', 
                loadComponent: () => import('./vistas/login/login.component').then(m=>m.LoginComponent)
        },
        {path: 'chats', 
                loadComponent: () => import('./vistas/chats/chats.component').then(m=>m.ChatsComponent),
                canActivate: [authenticateGuard]
        },
        {path: 'message', 
                loadComponent: () => import('./vistas/message/message.component').then(m=>m.MessageComponent),
                canActivate: [authenticateGuard]
        },

];
