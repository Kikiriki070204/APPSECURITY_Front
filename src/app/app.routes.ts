import { Routes } from '@angular/router';

export const routes: Routes = [
    
        {path: '', loadComponent:() => import('./vistas/index/index.component').then(m=> m.IndexComponent)},
        {path: 'register', loadComponent:() => import('./vistas/register/register.component').then(m=> m.RegisterComponent)},
        {path: 'login', loadComponent:() => import('./vistas/login/login.component').then(m=> m.LoginComponent)},
        {path: 'chats', loadComponent:() => import('./vistas/chats/chats.component').then(m=> m.ChatsComponent)},
        {path: 'message', loadComponent:() => import('./vistas/message/message.component').then(m=> m.MessageComponent)},

];
