import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  role = "";
  sub = "";

  constructor(public loginService:LoginService){}

  ngOnInit():void{
    this.getIdentidad();
  }

  getIdentidad(){
    this.loginService.getIdentity().subscribe(
      res => {
        this.sub = res.sub;
        this.role = res.rol;
      },
      err => {
        console.error(err);
      }
    )
  }
}
