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
  public haspoll = "noasignado";
  public docLleno = "";
  public doc = [];
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

  constructor(
    private titleService: Title,
    public loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router,
    private gameService: GameService) {
    this.titleService.setTitle("Mi usuario")
  };

  ngOnInit(): void {
    this.obtenerDoctor();
    this.verifyPoll();
    this.obtenerUsuario();
    this.relDoctor();
  }

  obtenerUsuario() {
    this.usuarioService.usuarioId().subscribe(
      res => {
        this.user = res.usuarioEncontrado;
      },
      err => {
        console.error(err);
      }
    )
  }

  obtenerDoctor() {
    this.usuarioService.obtenerDoctor().subscribe(
      res => {
        console.log(res);
        if(res.mensaje === "Aún no contiene doctor"){
          Swal.fire({
            title: 'Agrege un doctor',
            text: 'Para su pronta rehabilitación es necesario que tenga apoyo de un doctor, agregue uno.',
            icon: 'question',
            showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(["/add-doctor"])
            }
          })
        }else if(res.mensaje == "Contiene doctor"){
          this.docLleno = "lleno";
        }
        console.log(this.docLleno);

      },
      err => {
        console.error(err);
      }
    )
  }

  relDoctor(){
    this.usuarioService.relDoc().subscribe(
      res => {
        this.doc = res.resultado;
        console.log(this.doc);
      },
      err => {
        console.error(err);
      }
    )
  }

  verifyPoll() {
    this.gameService.verifyPoll().subscribe(
      res => {
        console.log(res);
        if (res.message == "El usuario tiene una encuesta") {
          this.haspoll = "tiene";
        } else if (res.message == "El usuario no tiene encuesta") {
          this.haspoll = "no tiene";
        }
        console.log(this.haspoll)
      },
      err => {
        console.error(err);
      }
    )
  }

  eliminarDoctor() {
    Swal.fire({
      title: 'Dejar este doctor',
      text: '¿Desea dejar este doctor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarDoctor().subscribe(
          res => {
            this.router.navigate(["/"])
            Swal.fire("Relación Eliminada", "La relación entre el doctor y tu ha sido eliminada. Regresa a 'Mi Usuario' para ver los cambios.", "success");
          },
          err => {
            switch (err.error.mensaje) {
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
