import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-initial-poll',
  templateUrl: './initial-poll.component.html',
  styleUrls: ['./initial-poll.component.css']
})
export class InitialPollComponent implements OnInit {
  public game = {
    response:""
  }
  constructor() { }

  ngOnInit(): void {
  }

  submitResponse(){
    console.log(this.game)
    Swal.fire({
      title: 'Finalizar prueba',
      text: '¿Está seguro de enviar la prueba?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
