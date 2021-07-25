import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { MyUserComponent } from './components/my-user/my-user.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: "",
    component: IndexComponent
  },{
    path: "signin",
    component: SigninComponent
  },{
    path: "signup",
    component: SignupComponent
  },{
    path: "my-user",
    component: MyUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
