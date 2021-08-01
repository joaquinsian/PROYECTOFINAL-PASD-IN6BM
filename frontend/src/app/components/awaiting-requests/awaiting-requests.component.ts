import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from 'src/app/services/login/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-awaiting-requests',
  templateUrl: './awaiting-requests.component.html',
  styleUrls: ['./awaiting-requests.component.css']
})
export class AwaitingRequestsComponent implements OnInit {
  solicitudes = [];

  constructor( private titleService: Title, private adminService: AdminService) {
    this.titleService.setTitle("Solicitudes Pendientes")
   }

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes(){
    this.adminService.obtenerSolicitudes(sessionStorage.getItem("authorization")).subscribe(
      res => {
        this.solicitudes = res.solicitudes;
        console.log(this.solicitudes)
      },
      err => {
        console.error(err);
      }
    )
  }

  aceptarSolicitud(newid: any){
    Swal.fire({
      title: 'Aceptar Solicitud Usuario',
      text: '¿Usted acepta como doctor a este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.adminService.aceptarSolicitud(newid, sessionStorage.getItem("authorization")).subscribe(
          res => {
            this.obtenerSolicitudes();
            Swal.fire("Nuevo Doctor", "El usuario ha sido convertido exitosamente a doctor", "success");
          },
          err => {
            console.error(err)
          }
        )
      }
    })
  }

  rechazarSolicitud(newid: any){
    Swal.fire({
      title: 'Rechazar Solicitud Doctor',
      text: '¿Usted rechaza como doctor a este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.adminService.rechazarSolicitud(newid, sessionStorage.getItem("authorization")).subscribe(
          res => {
            this.obtenerSolicitudes();
            Swal.fire("Usuario Rechazado", "El usuario ha sido rechazado como doctor exitosamente","success");
          },
          err => {
            console.error(err)
          }
        )
      }
    })
  }

}
