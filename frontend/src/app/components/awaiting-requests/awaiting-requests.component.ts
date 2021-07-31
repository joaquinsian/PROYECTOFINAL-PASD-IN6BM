import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-awaiting-requests',
  templateUrl: './awaiting-requests.component.html',
  styleUrls: ['./awaiting-requests.component.css']
})
export class AwaitingRequestsComponent implements OnInit {
  solicitudes = [];

  constructor( private titleService: Title ) {
    this.titleService.setTitle("Solicitudes Pendientes")
   }

  ngOnInit(): void {
  }

}
