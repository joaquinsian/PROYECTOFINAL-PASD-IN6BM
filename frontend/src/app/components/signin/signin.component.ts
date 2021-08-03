import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public user = {
    usuario: "",
    password: "",
    getToken: true
  }

  constructor(
    private titleService: Title, 
    private loginService:LoginService,
    private router:Router,
    private appComponent:AppComponent) {
    this.titleService.setTitle("Iniciar Sesión");
  }

  ngOnInit(): void {
  }

  signIn() {
    this.loginService.signIn(this.user).subscribe(
      res => {
        sessionStorage.setItem("authorization", res.token);
        this.appComponent.ngOnInit();
        this.router.navigate(["/"]);
      },
      err => {
        switch (err.error.mensaje) {
          case "La contraseña no coincide":
            Swal.fire('Error :(', 'La contraseña no coincide', 'error')
            break;
          case "El usuario no existe":
            Swal.fire('Error :(', 'No se encontró el usuario', 'error')
            break;
        }
      }
    )
  }
}
