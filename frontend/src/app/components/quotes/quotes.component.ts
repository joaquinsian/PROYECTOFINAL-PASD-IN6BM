import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/login/doctor.service';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  citas = [];

  constructor(private doctorService: DoctorService ,private usuarioService: UsuarioService, private titleService: Title, private router: Router) {
    this.titleService.setTitle("Todas mis Citas")
   }

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas(){
    this.doctorService.obtenerCitas().subscribe(
      res => {
        this.citas = res.citasDoc;
      },
      err => {
        console.error(err);
      }
    )
  }

  eliminarCita(newid: any){
    Swal.fire({
      title: 'Eliminar Cita',
      text: '¿Está seguro de eliminar esta cita?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.eliminarCita(sessionStorage.getItem("authorization"), newid).subscribe(
          res => {
            this.obtenerCitas();
            Swal.fire("Cita Eliminada", "La cita ha sido eliminada exitosamente.", "success");
          },
          err => {
            this.obtenerCitas();
            switch (err.error.mensaje) {
              case "Error en la petición":
                Swal.fire("Error :(", "Hubo un error en la petición, recarga la página", "error");
                break;
              case "No se ha podido eliminar la cita":
                Swal.fire("Error :(", "La cita no se ha podido eliminar", "error");
                break;
            }
          }
        )
      }
    })
  }

}
