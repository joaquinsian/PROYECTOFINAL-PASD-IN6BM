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
    CreateRequestComponent
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
