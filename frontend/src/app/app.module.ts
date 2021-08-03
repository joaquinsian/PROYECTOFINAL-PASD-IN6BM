import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { IndexComponent } from './components/index/index.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { MyUserComponent } from './components/my-user/my-user.component';
import { GameComponent } from './components/game/game.component';
import { InfoComponent } from './components/info/info.component';
import { GameByIdComponent } from './components/game/game-by-id/game-by-id.component';
import { AwaitingRequestsComponent } from './components/awaiting-requests/awaiting-requests.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { InitialPollComponent } from './components/my-user/initial-poll/initial-poll.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { AddQuotesComponent } from './components/quotes/add-quotes/add-quotes.component';
import { EditQuotesComponent } from './components/quotes/edit-quotes/edit-quotes.component';
import { AllUserComponent } from './components/all-user/all-user.component';
import { EditUserComponent } from './components/all-user/edit-user/edit-user.component';
import { GetAllScoresComponent } from './components/admin/get-all-scores/get-all-scores.component';
import { ChatByIdComponent } from './components/chat/chat-by-id/chat-by-id.component';



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    IndexComponent,
    SignupComponent,
    MyUserComponent,
    GameComponent,
    InfoComponent,
    GameByIdComponent,
    AwaitingRequestsComponent,
    CreateRequestComponent,
    InitialPollComponent,
    AddDoctorComponent,
    QuotesComponent,
    AddQuotesComponent,
    EditQuotesComponent,
    AllUserComponent,
    EditUserComponent,
    GetAllScoresComponent,
    ChatByIdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
