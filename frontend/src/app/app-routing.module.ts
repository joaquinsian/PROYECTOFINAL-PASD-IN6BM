import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AwaitingRequestsComponent } from './components/awaiting-requests/awaiting-requests.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { GameByIdComponent } from './components/game/game-by-id/game-by-id.component';
import { GameComponent } from './components/game/game.component';

import { IndexComponent } from './components/index/index.component';
import { InfoComponent } from './components/info/info.component';
import { InitialPollComponent } from './components/my-user/initial-poll/initial-poll.component';
import { MyUserComponent } from './components/my-user/my-user.component';
import { AddQuotesComponent } from './components/quotes/add-quotes/add-quotes.component';
import { EditQuotesComponent } from './components/quotes/edit-quotes/edit-quotes.component';
import { QuotesComponent } from './components/quotes/quotes.component';
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
    path: "my-user/game/game-by-id/:idjuego/:numero",
    component: GameByIdComponent
  },{
    path: "awaiting-requests",
    component: AwaitingRequestsComponent
  },{
    path: "create-request",
    component: CreateRequestComponent
  },{
    path: "my-user/initial-poll/:number",
    component: InitialPollComponent
  },{
    path: "add-doctor",
    component: AddDoctorComponent
  },{
    path: "quotes",
    component: QuotesComponent
  },{
    path: "add-quotes",
    component: AddQuotesComponent
  },{
    path: "edit-quotes/:idCita",
    component: EditQuotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
