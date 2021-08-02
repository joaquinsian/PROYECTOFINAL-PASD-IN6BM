import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game/game.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.css']
})
export class MyUserComponent implements OnInit {
  public role = "";
  doc = [];
  user = {
    _id: "",
    nombre: "",
    usuario: "",
    dpi: "",
    email: "",
    celular: "",
    foto: "",
    descripcion: "",
    rol: ""
  }

  constructor(private titleService: Title,public loginService:LoginService, private usuarioService: UsuarioService, private router: Router, private gameService: GameService) {
    this.titleService.setTitle("Mi usuario")
  };

  ngOnInit(): void {
    this.getIdentidad();
    this.obtenerUsuario();
    this.obtenerDoctor();
  }

  getIdentidad() {
    this.loginService.getIdentity().subscribe(
      res => {
        this.role = res.rol;
      },
      err => {
        console.error(err);
      }
    );
  }

  obtenerUsuario(){
    this.usuarioService.usuarioId().subscribe(
      res => {
        this.user = res.usuarioEncontrado;
      },
      err => {
        console.error(err);
      }
    )
  }

  obtenerDoctor(){
    this.usuarioService.obtenerDoctor().subscribe(
      res => {
        this.doc = res.resultado;
      },
      err => {
        console.error(err);
      }
    )
  }

  eliminarDoctor(){
    Swal.fire({
      title: 'Dejar este doctor',
      text: '¿Desea dejar este doctor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.usuarioService.eliminarDoctor().subscribe(
          res => {
            this.router.navigate(["/"])
            Swal.fire("Relación Eliminada", "La relación entre el doctor y tu ha sido eliminada. Regresa a 'Mi Usuario' para ver los cambios.", "success");
          },
          err => {
            switch(err.error.mensaje){
              case "Error en la petición":
                Swal.fire("Error :(", "Hubo un error en la petición, recarga la página", "error");
                break;
              case "No se ha podido eliminar la relación":
                Swal.fire("Error :(", "La relación entre el doctor y tu no se ha podido eliminar", "error");
                break;
            }
          }
        )
      }
    })
  }
}
