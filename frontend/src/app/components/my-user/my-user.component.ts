import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game/game.service';


@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.css']
})
export class MyUserComponent implements OnInit {

  user = {
    _id: "",
    nombre: "",
    usuario: "",
    dpi: "",
    email: "",
    celular: "",
    foto: "",
    descripcion: "",
    rol: ""
  }

  constructor(private titleService: Title,public loginService:LoginService, private usuarioService: UsuarioService, private route: ActivatedRoute, private gameService: GameService) {
    this.titleService.setTitle("Mi usuario")
  };

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario(){
    this.usuarioService.usuarioId().subscribe(
      res => {
        this.user = res.usuarioEncontrado;
        console.log(this.user);
      },
      err => {
        console.error(err);
      }
    )
  }
}
