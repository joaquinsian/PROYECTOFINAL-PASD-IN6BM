import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/login/doctor.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quotes',
  templateUrl: './add-quotes.component.html',
  styleUrls: ['./add-quotes.component.css']
})
export class AddQuotesComponent implements OnInit {
  public pacientes = [];
  public quoutes = {
    usuario: "",
    doctor: "",
    fecha_cita: null
  }
  constructor(private titleService: Title, private loginService: LoginService, private doctorService: DoctorService, private router: Router) {
    this.titleService.setTitle("Creación de Citas")
  }

  ngOnInit(): void {
    this.misPacientes();
  }

  misPacientes(){
    this.doctorService.obtenerPacientes().subscribe(
      res => {
        this.pacientes = res.misPacientes;
        console.log(this.pacientes);
      },
      err => {
        console.error(err);
      }
    )
  }

  addQuotes(){
    this.doctorService.agregarCitas(sessionStorage.getItem("authorization"), this.quoutes).subscribe(
      res => {
        Swal.fire('Crear Cita', 'Cita Creada Exitosamente', 'success')
          this.quoutes = {
            usuario: "",
            doctor: "",
            fecha_cita: null
          }
          this.router.navigate(["/quotes"])
      },
      err => {
        switch(err.error.mensaje){
          case "Error en la petición":
            Swal.fire('Error :(', 'Error en la petición', 'error')
            break;
          case "No se ha podido almacenar la cita":
            Swal.fire('Error :(', 'No se ha podido almacenar la cita', 'error')
            this.quoutes = {
              usuario: "",
              doctor: "",
              fecha_cita: null
            }
            break;
        }
      }
    )
  }

}
