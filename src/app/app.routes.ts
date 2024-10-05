import { Routes } from '@angular/router';
import { IndexComponent } from './vistas/index/index.component';
import { RegisterComponent } from './vistas/register/register.component';
import { LoginComponent } from './vistas/login/login.component';
import { ChatsComponent } from './vistas/chats/chats.component';
import { MessageComponent } from './vistas/message/message.component';
import { authenticateGuard } from './guards/authenticate.guard';

export const routes: Routes = [
    
        {path: '',
        component: IndexComponent
},
        {path: 'register',
        component: RegisterComponent
        },
        {path: 'login', 
        component: LoginComponent
        },
        {path: 'chats', 
        component: ChatsComponent,
        canActivate: [authenticateGuard]
        },
        {path: 'message', 
        component: MessageComponent,
        canActivate: [authenticateGuard]

        },

];
