import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'registerSuccess',component:RegisterSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
