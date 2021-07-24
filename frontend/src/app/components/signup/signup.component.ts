import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    nombre: "",
    usuario: "",
    dpi: "",
    email: "",
    celular: "",
    password: ""
  };

  constructor(private titleService: Title,private loginService:LoginService) {
    this.titleService.setTitle("Registrarse");
  }

  ngOnInit(): void {
  }

  signUp() {
    this.loginService.signUp(this.user).subscribe(
      res => {
        Swal.fire('Registro exitoso', 'Ya puede iniciar sesión con ese usuario', 'success');
        this.user = {
          nombre: "",
          usuario: "",
          dpi: "",
          email: "",
          celular: "",
          password: ""
        };
      },
      err => {
        switch (err.error.mensaje) {
          case "El usuario es existente":
            Swal.fire('Error :(', 'El usuario ya existe, intente otro nombre de usuario', 'error')
            break;
          default:
            Swal.fire('Error :(', 'Revise la consola para más información', 'error')
            break;
        }
      }
    )
  }
}
