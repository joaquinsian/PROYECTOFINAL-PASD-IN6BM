import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from 'src/app/services/login/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  public users = [];

  constructor(private titleService: Title, private adminService: AdminService) {
    this.titleService.setTitle("Todos los usuarios")
   }

  ngOnInit(): void {
    this.allUsers();
  }

  allUsers(){
    this.adminService.getAllUsers(sessionStorage.getItem("authorization")).subscribe(
      res => {
        this.users = res.usuarios;
        console.log(this.users);
      },
      err => {
        console.error(err);
      }
    )
  }

  deleteUser(newid: any){
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Está seguro de eliminar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.adminService.eliminarUsuarios(sessionStorage.getItem("authorization"), newid).subscribe(
          res => {
            this.allUsers();
            Swal.fire("Usuario Eliminado", "El usuario ha sido eliminado exitosamente","success");
          },
          err => {
            switch(err.error.mensaje){
              case "Error en la petición":
                Swal.fire('Error :(', 'Error en la petición', 'error')
                break;
              case "No se ha podido eliminar el usuario":
                Swal.fire('Error :(', 'No se ha podido eliminar el usuario, recarge la página', 'error')
            }
          }
        )
      }
    })
  }
}
