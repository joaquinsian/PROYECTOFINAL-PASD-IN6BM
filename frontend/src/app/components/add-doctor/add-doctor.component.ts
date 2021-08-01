import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  public doctorDetalle = [];
  public doctores;
  public newDoctor = {
    doctor: "",
    usuario: "",
    progreso: null,
  }
  public sub = "";

  constructor(private loginService: LoginService, private usuarioService: UsuarioService, private router: Router, private titleService: Title) {
    this.titleService.setTitle("Agregar Doctor");
  }


  ngOnInit(): void {
    this.obtenerEspecialidades();
    this.getDoctores();
    this.obtenerIdentidad();
  }

  obtenerEspecialidades(){
    this.usuarioService.obtenerEspecialidades().subscribe(
      res => {
        this.doctorDetalle = res.datos;
        console.log(this.doctorDetalle);
      },
      err => {
        console.error(err);
      }
    )
  }

  getDoctores(){
    this.usuarioService.doctores().subscribe(
      res => {
        this.doctores = res.doctores;
        console.log(this.doctores);
      },
      err => {
        console.error(err);
      }
    )
  }

  addDoctor(){
    this.usuarioService.agregarDoctor(sessionStorage.getItem("authorization"), this.newDoctor).subscribe(
      res => {
        Swal.fire('Doctor Agregado con Éxito!', 'Ya tiene una relación con su doctor', 'success')
        this.newDoctor = {
          doctor: "",
          usuario: "",
          progreso: null
        }
      },
      err => {
        switch(err.error.mensaje){
          case "Error en la petición":
            Swal.fire('Error :(', 'Hubo un error en la petición', 'error')
            this.newDoctor = {
              doctor: "",
              usuario: "",
              progreso: null,
            }
            break;
          case "Usted ya tiene un doctor":
            Swal.fire('Error :(', 'Usted ya tiene relación con un doctor', 'error')
            this.newDoctor = {
              doctor: "",
              usuario: "",
              progreso: null,
            }
            break;
        }
      }
    )
  }

  obtenerIdentidad(){
    this.loginService.getIdentity().subscribe(
      res => {
        this.sub = res.sub
      },
      err => {
        console.error(err);
      }
    )
  }
}
