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
    password: "",
    foto: "",
    descripcion: ""
  };

  constructor(private titleService: Title,private loginService:LoginService, private router: Router) {
    this.titleService.setTitle("Registrarse");
  }

  ngOnInit(): void {
  }

  signUp() {
    if(this.validURL(this.user.foto)){
      this.loginService.signUp(this.user).subscribe(
        res => {
          Swal.fire('Registro exitoso', 'Ya puede iniciar sesión con ese usuario', 'success');
          this.user = {
            nombre: "",
            usuario: "",
            dpi: "",
            email: "",
            celular: "",
            password: "",
            foto: "",
            descripcion: ""
          };
          this.router.navigate(["/"])
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
    }else{
      Swal.fire('Error :(', 'La URL de su foto no es válida', 'error')
    }
  }

  validURL(str: string){
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str)
  }
}
