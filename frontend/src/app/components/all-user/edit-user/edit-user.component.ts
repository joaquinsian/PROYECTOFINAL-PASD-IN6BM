import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/login/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  idUsuario = "";
  paramsSubscription: Subscription = new Subscription;
  newUser = {
    nombre: "",
    usuario: "",
    dpi: "",
    email: "",
    celular: "",
    foto: "",
    descripcion: "",
    rol: ""
  }

  constructor(private titleService: Title, private adminService: AdminService, private router: Router, private route: ActivatedRoute) {
    this.titleService.setTitle("Editar Usuario")
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.idUsuario = params['idUsuario'];
    })
    this.getAllData(this.idUsuario)
  }

  getAllData(newid: any){
    this.adminService.usuarioId(sessionStorage.getItem("authorization"), newid).subscribe(
      res => {
        this.newUser.nombre = res.usuarioEncontrado.nombre;
        this.newUser.usuario = res.usuarioEncontrado.usuario;
        this.newUser.dpi = res.usuarioEncontrado.dpi;
        this.newUser.email = res.usuarioEncontrado.email;
        this.newUser.celular = res.usuarioEncontrado.celular;
        this.newUser.foto = res.usuarioEncontrado.foto;
        this.newUser.descripcion = res.usuarioEncontrado.descripcion;
        this.newUser.rol = res.usuarioEncontrado.rol;
      },
      err => {
        console.error(err);
      }
    )
  }

  editarUsuario(){
    this.adminService.editUser(sessionStorage.getItem("authorization"), this.idUsuario, this.newUser).subscribe(
      res => {
        Swal.fire('Usuario', 'Usuario editado exitosamente', 'success')
        this.router.navigate(['/all-user'])
      },
      err => {
        console.error(err);
      }
    )
  }

}
