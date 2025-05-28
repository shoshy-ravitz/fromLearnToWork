import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { ResultsListComponent } from './interview-results/results-list/results-list.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { ResultDetailComponent } from './interview-results/result-detail/result-detail.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserEditComponent } from './user-management/user-edit/user-edit.component';

export const routes: Routes = [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
      { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard] }, // נתיב להצגת פרטי משתמש
      { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard] }, // נתיב לעריכת פרטי משתמש
      { path: 'results', component: ResultsListComponent, canActivate: [AuthGuard] },
      { path: 'results/:id', component: ResultDetailComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: '**', redirectTo: '/login' }
];
