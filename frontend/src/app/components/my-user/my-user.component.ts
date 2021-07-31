import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.css']
})
export class MyUserComponent implements OnInit {
  public role="";

  constructor(private titleService: Title,public loginService:LoginService) {
    this.titleService.setTitle("Mi Usuario");
  }

  ngOnInit(): void {
    this.getIdentidad();
  }

  getIdentidad(){
    this.loginService.getIdentity().subscribe(
      res => this.role = res.rol,
      err => console.error(err)
    );

  }
}
