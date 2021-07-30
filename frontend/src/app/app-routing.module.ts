import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameByIdComponent } from './components/game/game-by-id/game-by-id.component';
import { GameComponent } from './components/game/game.component';

import { IndexComponent } from './components/index/index.component';
import { InfoComponent } from './components/info/info.component';
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
  },{
    path: "my-user/game",
    component: GameComponent
  },{
    path: "info/:id",
    component: InfoComponent
  },{
    path: "my-user/game/:idsaber",
    component: GameByIdComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
