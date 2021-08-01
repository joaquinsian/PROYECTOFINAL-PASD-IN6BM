import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  constructor(private titleService: Title, private loginService: LoginService, private usuarioService: UsuarioService, private router: Router) {
    this.titleService.setTitle("Crear Solicitud de Doctor")
  }

  request = {
    foto: "",
    hospital: "",
    especialidad: "",
    usuario: ""
  }

  ngOnInit(): void {
  }

  crearSolicitud(){
    if(this.validURL(this.request.foto)){
      this.usuarioService.crearSolicitud(sessionStorage.getItem("authorization"), this.request).subscribe(
        res => {
          Swal.fire('Solicitud Enviada con Éxito', 'Espera a que el administrador acepte tu solicitud', 'success')
          this.router.navigate(['/my-user'])
        },
        err => {
          switch(err.error.mensaje){
            case "Error en la petición":
              Swal.fire('Error :(', 'Error en la petición', 'error')
              break;
            case "Ya fue enviada la solicitud":
              Swal.fire('Error :(', 'Ya envió una solicitud', 'error')
              break;
          }
        }
      )
    }else{
      Swal.fire('Error :(', 'La URL no es válida', 'error')
    }
  }


  validURL(str:string){
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str)
  }

}
