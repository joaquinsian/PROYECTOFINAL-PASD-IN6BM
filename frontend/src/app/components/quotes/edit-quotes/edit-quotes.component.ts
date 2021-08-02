import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/services/login/doctor.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-quotes',
  templateUrl: './edit-quotes.component.html',
  styleUrls: ['./edit-quotes.component.css']
})
export class EditQuotesComponent implements OnInit {
  idCita = "";
  paramsSubscription: Subscription = new Subscription;

  updQuote = {
    usuario: "",
    doctor: "",
    fecha_cita: ""
  }

  constructor(private titleService: Title, private route: ActivatedRoute, private router: Router, private loginService: LoginService, private doctorService: DoctorService) {
    this.titleService.setTitle("Editar Cita");
   }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.idCita = params['idCita'];
    })
    this.getAllData(this.idCita);
  }

  getAllData(newid: any){
    this.doctorService.citaId(newid).subscribe(
      res => {
        this.updQuote.usuario = res.cita.usuario;
        this.updQuote.doctor = res.cita.doctor;
        this.updQuote.fecha_cita = res.cita.fecha_cita;
        console.log(this.updQuote);

      },
      err => {
        console.error(err);
      }
    )
  }

  editarCita(){
    this.doctorService.editarCita(sessionStorage.getItem("authorization"), this.idCita, this.updQuote).subscribe(
      res => {
        Swal.fire('Cita Editada', 'La cita ha sido editada exitosamente', 'success')
        this.router.navigate(['/quotes'])
      },
      err => {
        console.error(err);
      }
    )
  }

}
