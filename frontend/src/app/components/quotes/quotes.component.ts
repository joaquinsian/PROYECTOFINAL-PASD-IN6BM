import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/login/doctor.service';
import { UsuarioService } from 'src/app/services/login/usuario.service';

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

}
